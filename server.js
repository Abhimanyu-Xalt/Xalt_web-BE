// const express = require('express');
// const nodemailer = require('nodemailer');
// const app = express();
// const PORT = 5050;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.post('/submit', (req, res) => {
//   const { name, email, subject, message } = req.body;

//   // Configure Nodemailer
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'abhimanyu.xalt@gmail.com', // Your Gmail address
//       pass: 'gvgm rhje txrv lcyd' // Your Gmail password or app password
//     }
//   });

//   const mailOptions = {
//     from: 'abhimanyu.xalt@gmail.com',
//     to: email, // Send the response to the user's email
//     subject: subject,
//     text: `Hello ${name},\n\nThank you for your message:\n${message}\n\nBest regards,\nYour Company`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error('Error sending email:', error); // Log the error
//       return res.status(500).send('Error sending email: ' + error.toString());
//     }
//     res.status(200).send('Email sent: ' + info.response);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });












const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

// const app = express();


// import express from "express";
// import mongoose from "mongoose";
// import cors from "cors";
// import nodemailer from "nodemailer";

const app = express();

const PORT =  3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://Xalt-test:nsFEW4w6OzddKead@test.yux69jn.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Mongoose Schema & Model
const FormSubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String  },
  details: { type: String},
  submittedAt: { type: Date, default: Date.now }
});

const FormSubmission = mongoose.model("FormSubmission", FormSubmissionSchema);

// Configure Nodemailer


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: 'abhimanyu.xalt@gmail.com', // Your Gmail address
//     pass: 'gvgm rhje txrv lcyd' 
//   }
// });

// const transporter = nodemailer.createTransport({
//   host: "smtp.office365.com", // ✅ Use Outlook's SMTP server
//   port: 587, // ✅ Use 587 for TLS (recommended)
//   secure: false, // ✅ `false` for TLS
//   auth: {
//     user: 'sales@xaltanalytics.com', // ✅ Your Outlook email
//     pass: 'pqwrjtdkhtkzhlds' // ✅ Your Outlook password (or App Password)
//   },
//   tls: {
//     ciphers: "SSLv3", // ✅ Ensures a secure connection
//   }
// });




// git branch -M main

// API Route to Handle Form Submission
app.post("/submit", async (req, res) => {
  const { name, email, organization, details } = req.body;

  if (!name || !email || !organization || !details) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save data to MongoDB
    const newSubmission = new FormSubmission({ name, email, organization, details });
    await newSubmission.save();

    // Send confirmation email to the user
    // const mailOptions = {
    //   from: "abhimanyu.mishra@xaltanalytics.com",
    //   to: email,
    //   text: `Hello ${name},\n\nThank you for reaching out!\n\nWe have received your details:\n\nOur team will get back to you shortly.\n\nBest regards,\nXalt Analytics`
    // };

    // await transporter.sendMail(mailOptions);

    res.status(200).json({ details: "Form submitted successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error processing request" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
