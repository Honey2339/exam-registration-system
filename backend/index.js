const express = require("express");
const cors = require("cors");
const { userModel, examModel } = require("./models/userModel");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5001;
const MONGO_URL = process.env.MONGO_URL;
const app = express();

app.use(express.json());
app.use(cors());

app.post("/api/signup", async (req, res) => {
  const { username, password } = req.body;
  const alreadyUser = await userModel.findOne({ username });
  if (alreadyUser) {
    return res.status(400).send({ msg: "User Already Exist" });
  }
  const newUser = new userModel({
    username: username,
    password: password,
  });
  await newUser.save();
  res.status(201).json({ msg: "User created successfully" });
});

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await userModel.findOne({ username, password });
  if (user) {
    res.status(200).send({ msg: "User Logged In" });
  } else {
    return res.status(400).send({ msg: "User Failed To Login" });
  }
});

app.post("/api/user/register", async (req, res) => {
  const { username } = req.body;
  const { title, description, price } = req.body;
  const user = await userModel.findOne({ username });
  if (!user) {
    return res.status(400).send({ msg: "User Not Found" });
  }
  user.exams.push({ title, description, price, isRegistered: true });
  await user.save();
  res.status(200).send({ msg: "User Successfully Registered For Exam" });
});

app.post("/api/register", async (req, res) => {
  const { title, description, price } = req.body;
  const already = await examModel.findOne({ title, description });
  if (already) {
    return res.status(400).send({ msg: "Exam already exist" });
  }
  const newExam = new examModel({
    title: title,
    description: description,
    price: price,
  });
  await newExam.save();
  res.status(200).send({ msg: "New Exam Created" });
});

app.post("/api/getexam", async (req, res) => {
  const username = req.body.username;
  const user = await userModel.findOne({ username });
  const allExams = await examModel.find();
  const userRegisteredExams = user ? user.exams : [];

  const examsWithRegistrationStatus = allExams.map((exam) => ({
    ...exam.toObject(),
    isRegistered: userRegisteredExams.some(
      (userExam) => userExam.title === exam.title
    ),
  }));

  res.status(200).send({ allExams: examsWithRegistrationStatus });
});

mongoose
  .connect(MONGO_URL)
  .then(
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    })
  )
  .catch((err) => {
    console.log(err);
  });
