const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors"); //need?
//const yessir = require('twilio')("xxxx", "xxxx");

const app = express();

let db;
const url = `mongodb+srv://Ramez:U75ZRvMsST1W5IK6@portaledcluster.x6u4jx9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors()) //need this?

async function startServer() {

  try {
    await client.connect();
    
    console.log("Connected to MongoDB");

    const database = client.db("PortedEd");
    const studentCollection = database.collection("Student");
    const parentCollection = database.collection("Parent");
    const teacherCollection = database.collection("Teacher");
    const classCollection = database.collection("Class");
    const attendanceCollection = database.collection("Attendance");
    const academicsCollection = database.collection("Academics");
    const behaviorCollection = database.collection("Behavior");

    // this is an end point to get all the users from /getStudents
    app.post("/getStudents", async (req, res) => {
      await client.connect();
      console.log("request recieved for " + req.body.studentId);
      const student = await studentCollection.findOne({
        studentID: String(req.body.studentId),
      });
      res.status(200).json(student);
    });



    app.post("/countUnacknowledgedAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        console.log("Counting unacknowledged alerts for studentID:", studentID);
        const count = await academicsCollection.countDocuments({
          studentID: studentID,
          acknowledged: false
        });
        console.log("Unacknowledged alerts count:", count);
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error counting unacknowledged alerts:", error);
        res.status(500).json({ message: "Error counting unacknowledged alerts" });
      }
    });



    app.post("/countUnacknowledgedAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const count = await academicsCollection.countDocuments({
          studentID: studentID,
          acknowledged: false
        });
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error counting unacknowledged alerts:", error);
        res.status(500).json({ message: "Error counting unacknowledged alerts" });
      }
    });

    app.post("/countUnacknowledgedBehaviorAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const count = await behaviorCollection.countDocuments({
          studentID: studentID,
          acknowledged: false
        });
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error counting unacknowledged behavior alerts:", error);
        res.status(500).json({ message: "Error counting unacknowledged behavior alerts" });
      }
    });

    app.post("/countUnacknowledgedAttendanceAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const count = await attendanceCollection.countDocuments({
          studentID: studentID,
          acknowledged: false
        });
        res.status(200).json({ count });
      } catch (error) {
        console.error("Error counting unacknowledged attendance alerts:", error);
        res.status(500).json({ message: "Error counting unacknowledged attendance alerts" });
      }
    });


    app.post("/getParent", async (req, res) => {
      await client.connect();
      console.log("request recieved for " + req.body.parent_id);
      const parent = await parentCollection.findOne({
        parent_id: String(req.body.parent_id),
      });
      res.status(200).json(parent);
    });


    // app.post("/getParent", async (req, res) => {
    //   // Connect to MongoDB
    //   await client.connect();
    
    //   // Get parentID from request body
    //   const { parentID } = req.body;
    
    //   // Query the MongoDB database
    //   const parentData = await parentCollection.findOne({ parent_id: parentID });
    
    //   // Send response back to client
    //   res.status(200).json(parentData);
    // });
    



    //end point to get class information
    app.post("/getClass", async (req, res) => {
      await client.connect();
      const classes = await classCollection.findOne({
        class_id: String(req.body.class_id),
      });
      res.status(200).json(classes);
    });

    //end point to get teacher information given teacher_id
    app.post("/getTeacher", async (req, res) => {
      await client.connect();
      const teachers = await teacherCollection.findOne({
        teacher_id: String(req.body.teacher_id),
      });
      res.status(200).json(teachers);
    });



    

    

    //end point to get attendance
    app.post("/getAttendance", async (req, res) => {
      try {
        const {studentID, class_id} = req.body;
        const attendanceData = await attendanceCollection.findOne({studentID, class_id});
        if(!attendanceData) {
          return res.status(404).json({message: "Attendance data not found"});
        }
        res.status(200).json(attendanceData);
      } catch(error) {
        console.error("Error fetching attendance data:", error);
        res.status(500).json({message: "Error fetching attendance data"});
      }
    });

    //end point to get academics
    app.post("/getAcademics", async (req, res) => {
      try {
        const {studentID, class_id} = req.body;
        const academicsData = await academicsCollection.findOne({studentID, class_id});
        if(!academicsData) {
          return res.status(404).json({message: "Academics data not found"});
        }
        res.status(200).json(academicsData);
      } catch(error) {
        console.error("Error fetching academics data:", error);
        res.status(500).json({message: "Error fetching academics data"});
      }
    });

    //end point to get behavior
    app.post("/getBehavior", async (req, res) => {
      try {
        const {studentID, class_id} = req.body;
        const behaviorData = await behaviorCollection.findOne({studentID, class_id});
        if(!behaviorData) {
          return res.status(404).json({message: "Behavior data not found"});
        }
        res.status(200).json(behaviorData);
      } catch(error) {
        console.error("Error fetching behavior data:", error);
        res.status(500).json({message: "Error fetching behavior data"});
      }
    });


    app.post("/getStudentsByParent", async (req, res) => {
      console.log("Request received for parent_id:", req.body.parent_id);
      try {
        await client.connect();
        const { parent_id } = req.body;
        const students = await studentCollection.find({ parent_id: parent_id }).toArray();
        res.status(200).json(students);
      } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Error fetching students" });
      }
    });

    app.post("/login", async(req, res) => {
      try {
        const { email, password } = req.body;
        const user = await parentCollection.findOne({ email });

        if(user) {
          if(password === user.password) {
            return res.status(200).json({
              message: "Email exists",
              userId: user.parent_id
            });
          }
        }
    
      } catch(error){
        console.log("Error login in the user", error);
        res.status(500).json({message: "Login error"})
      }
    })

    app.post("/email-verification", async(req, res) => {
      try {
        const { email } = req.body;
        const user = await parentCollection.findOne({ email });

        if(user) {
          return res.status(200).json({
            message: "Email exists",
            userPhone: user.phone,
            userEmail: user.email,
          });
        } else {
            return res.status(404).json({ message: "Email doesn't exist" });
        }
      } catch(error){
        console.log("Error verifying email", error);
        res.status(500).json({message: "Login error"})
      }
    })

    app.post("/find-email", async(req, res) => {
      try {
        const { fname, lname, phone } = req.body;
        const user = await parentCollection.findOne({ phone });

        if(user) {
          if (fname == user.fname && lname == user.lname) {
            return  res.status(200).json({ 
              message: "Found email", 
              email: user.email });
          }
        } else {
          return res.status(404).json({ message: "Email doesn't exist" });
        }
    
      } catch(error){
        console.log("Couldn't find email", error);
        res.status(500).json({message: "Oops"})
      }
    })

    app.post("/start-verify", async (req, res)  => {
      const {phone, email} = req.body

      yessir.verify.v2.services('xxxx')
        .verifications
        .create({to: phone, channel: 'sms'})
        .then(verification => console.log(verification.status));
    });

    app.post("/start-check", async (req, res)  => {
      const { code, phone } = req.body
      
      yessir.verify.v2.services('xxxx')
        .verificationChecks
        .create({to: phone, code: code})
        .then(verification_check => {
          if (verification_check.status === 'approved'){
          return res.status(200).json();
          }
        });
    });

    app.post("/reset-password", async(req, res) => {
      const { email, password } = req.body;

      const query = { "name": email };
      const update = {
          "$set": {
            "password": password
          }
        };

      const options = { returnNewDocument: true };

      parentCollection.findOneAndUpdate({email}, update, options)
        .then(updatedDocument => {
          if(updatedDocument) {
            console.log(`Successfully updated document: ${updatedDocument}.`)
            return res.status(200).json();
          } else {
            console.log("No document matches the provided query.")
          }
          return updatedDocument
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))   
    })

    // Start the Express server
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {
    //await client.close();
  }
}

startServer();
