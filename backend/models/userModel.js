const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isRegistered: { type: Boolean, required: true, default: false },
});

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  exams: [examSchema],
});

const pecDB = mongoose.connection.useDb("pec-ers");
const userModel = pecDB.model("pecers-users", userSchema);
const examModel = pecDB.model("pecers-exams", examSchema);

module.exports = { userModel, examModel };
