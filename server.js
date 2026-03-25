const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

/* =========================
   🔗 MongoDB Connection
========================= */
mongoose.connect("mongodb://127.0.0.1:27017/appointments")
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

/* =========================
   📄 Schema
========================= */
const AppointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  doctor: String,
  date: String,
  time: String
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

/* =========================
   📌 Routes
========================= */

// Test route
app.get("/", (req, res) => {
  res.send("Server Working ✅");
});

// Save appointment
app.post("/book", async (req, res) => {
  const { name, email, doctor, date, time } = req.body;

  try {
    const newAppointment = new Appointment({
      name,
      email,
      doctor,
      date,
      time
    });

    await newAppointment.save();

    res.send("✅ Appointment Saved");

  } catch (err) {
    console.log("FULL ERROR 👉", err);
    res.status(500).send("❌ Error");
  }
});

/* =========================
   🚀 Server Start
========================= */
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});