const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const cors = require("cors"); //need?

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

    app.post("/login", async(req, res) => {
      try {
        const { email, password } = req.body;
        const user = await parentCollection.findOne({ email });
        console.log("hi", user.email)
        if(user) {
          console.log("User Exists")
          if(password === user.password) {
            return res.status(200).json({
              message: "Email exists",
              userId: user.parent_id,
              userPhone: user.phone,
              userEmail: user.email,
            });
          }
        }
    
      } catch(error){
        console.log("Error login in the user", error);
        res.status(500).json({message: "Login error"})
      }
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
