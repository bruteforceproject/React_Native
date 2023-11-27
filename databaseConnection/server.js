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
    const alertCollection = database.collection("Alert")

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

    const fetchClassDetails = async (classId) => {
      try {
        const response = await fetch('http://192.168.0.19:8000/getClass', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ class_id: classId })
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          console.error('Failed to fetch class details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
      return null;
    };

    app.post("/getAlertDescription", async (req, res) => {
      try {
        await client.connect();
        const { alertID } = req.body;
        
        // Use the alertCollection to find the alert by its ID
        const alertData = await alertCollection.findOne({ alertID: alertID });
        
        if (alertData) {
          // Send back the alert description if the alert is found
          res.status(200).json({ alertDesc: alertData.alertDesc });
        } else {
          // Handle cases where the alert is not found
          res.status(404).json({ message: "Alert description not found" });
        }
      } catch (error) {
        console.error("Error fetching alert description:", error);
        res.status(500).json({ message: "Error fetching alert description" });
      }
    });
    

    app.post("/getUnacknowledgedAcademicAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        
        // Query the 'Academics' collection for unacknowledged alerts for the given studentID
        const academicAlerts = await academicsCollection.find({
          studentID: studentID,
          acknowledged: false // assuming there is an 'acknowledged' field to check if the alert is acknowledged
        }).toArray();
    
        if (academicAlerts.length > 0) {
          res.status(200).json(academicAlerts);
        } else {
          res.status(404).json({ message: "No unacknowledged academic alerts found" });
        }
      } catch (error) {
        console.error("Error fetching unacknowledged academic alerts:", error);
        res.status(500).json({ message: "Error fetching unacknowledged academic alerts" });
      }
    });



    app.post("/getUnacknowledgedAttendanceAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const alerts = await attendanceCollection.find({
          studentID: studentID,
          acknowledged: false
        }).toArray();
        res.status(200).json(alerts);
      } catch (error) {
        console.error("Error fetching unacknowledged attendance alerts:", error);
        res.status(500).json({ message: "Error fetching unacknowledged attendance alerts" });
      }
    });


    app.post("/getUnacknowledgedBehaviorAlerts", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const behaviorAlerts = await behaviorCollection.find({
          studentID: studentID,
          acknowledged: false
        }).toArray();
    
        res.status(200).json(behaviorAlerts);
      } catch (error) {
        console.error("Error fetching unacknowledged behavior alerts:", error);
        res.status(500).json({ message: "Error fetching unacknowledged behavior alerts" });
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

    app.post("/acknowledgeAcademicAlerts", async (req, res) => {
      try {
          await client.connect();
          const { studentID } = req.body;
  
          // Update the 'acknowledged' field to true for all documents
          // where 'studentID' matches and 'acknowledged' is false
          const result = await academicsCollection.updateMany(
              { studentID: studentID, acknowledged: false },
              { $set: { acknowledged: true } }
          );
  
          if (result.modifiedCount > 0) {
              console.log(`Successfully acknowledged ${result.modifiedCount} academic alerts.`);
              res.status(200).json({ message: "Academic alerts acknowledged successfully" });
          } else {
              // Handle case where no documents were updated
              console.log("No academic alerts to acknowledge.");
              res.status(200).json({ message: "No academic alerts to acknowledge" });
          }
      } catch (error) {
          console.error("Failed to acknowledge academic alerts:", error);
          res.status(500).json({ message: "Failed to acknowledge academic alerts" });
      }
  });

  app.post("/acknowledgeBehaviorAlerts", async (req, res) => {
    try {
        await client.connect();
        const { studentID } = req.body;

        // Update the 'acknowledged' field to true for all documents
        // where 'studentID' matches and 'acknowledged' is false
        const result = await behaviorCollection.updateMany(
            { studentID: studentID, acknowledged: false },
            { $set: { acknowledged: true } }
        );

        if (result.modifiedCount > 0) {
            console.log(`Successfully acknowledged ${result.modifiedCount} behavior alerts.`);
            res.status(200).json({ message: "Behavior alerts acknowledged successfully" });
        } else {
            // Handle case where no documents were updated
            console.log("No behavior alerts to acknowledge.");
            res.status(200).json({ message: "No behavior alerts to acknowledge" });
        }
    } catch (error) {
        console.error("Failed to acknowledge behavior alerts:", error);
        res.status(500).json({ message: "Failed to acknowledge behavior alerts" });
    }
});

app.post("/acknowledgeAttendanceAlerts", async (req, res) => {
  try {
      await client.connect();
      const { studentID } = req.body;

      // Update the 'acknowledged' field to true for all documents
      // where 'studentID' matches and 'acknowledged' is false
      const result = await attendanceCollection.updateMany(
          { studentID: studentID, acknowledged: false },
          { $set: { acknowledged: true } }
      );

      if (result.modifiedCount > 0) {
          console.log(`Successfully acknowledged ${result.modifiedCount} attendance alerts.`);
          res.status(200).json({ message: "Attendance alerts acknowledged successfully" });
      } else {
          // Handle case where no documents were updated
          console.log("No attendance alerts to acknowledge.");
          res.status(200).json({ message: "No attendance alerts to acknowledge" });
      }
  } catch (error) {
      console.error("Failed to acknowledge attendance alerts:", error);
      res.status(500).json({ message: "Failed to acknowledge attendance alerts" });
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

    app.post("/getParentIdByStudentId", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
    
        // Query the 'Student' collection for the given studentID
        const student = await studentCollection.findOne({ studentID: studentID });
    
        if (student) {
          // If the student is found, send back the parent_id
          res.status(200).json({ parent_id: student.parent_id });
        } else {
          // If no student is found, send an appropriate response
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error("Error fetching parent ID:", error);
        res.status(500).json({ message: "Error fetching parent ID" });
      }
    });
    

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

    app.post("/getStudentAllDetails", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const student = await studentCollection.findOne({ studentID: studentID });
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).json({ message: "Error fetching student details" });
      }
    });

    app.post("/getCompleteStudentDetails", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
        const student = await studentCollection.findOne({ studentID: studentID });
    
        if (student) {
          res.status(200).json(student);
        } else {
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error("Error fetching complete student details:", error);
        res.status(500).json({ message: "Error fetching complete student details" });
      }
    });

    app.post("/getStudentDetails", async (req, res) => {
      try {
        await client.connect();
        const { studentID } = req.body;
    
        // Query the 'Student' collection for the given studentID
        const student = await studentCollection.findOne({ studentID: studentID });
    
        if (student) {
          // If the student is found, send the first and last names
          res.status(200).json({ fname: student.fname, lname: student.lname });
        } else {
          // If no student is found, send an appropriate response
          res.status(404).json({ message: "Student not found" });
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        res.status(500).json({ message: "Error fetching student details" });
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
