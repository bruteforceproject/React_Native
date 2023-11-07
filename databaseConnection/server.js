const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

let db;
const url = `mongodb+srv://Ramez:U75ZRvMsST1W5IK6@portaledcluster.x6u4jx9.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

app.use(express.json());


async function startServer() {

  try {
    await client.connect();
    
    console.log("Connected to MongoDB");

    const database = client.db("PortedEd");
    const studentCollection = database.collection("Student");
    const parentCollection = database.collection("Parent");
    const teacherCollection = database.collection("Teacher");


  } catch (error) {
    console.error("MongoDB connection error:", error);
  } finally {

  }
}

startServer();
