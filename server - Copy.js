const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static("public"));

app.post("/book", async (req,res)=>{

const {name,email,doctor,date,time} = req.body;

try{

let transporter = nodemailer.createTransport({
service: "gmail",
auth:{
user: "yourgmail@gmail.com",
pass: "your_app_password"
}
});

let mailOptions = {
from: "yourgmail@gmail.com",
to: email,
subject: "Appointment Confirmed",
text: `Hello ${name}, your appointment with ${doctor} on ${date} at ${time} is confirmed.`
};

await transporter.sendMail(mailOptions);

res.send("Email Sent ✅");

}catch(err){
console.log(err);
res.send("Error ❌");
}

});

app.listen(3000,()=>{
console.log("Server running at http://localhost:3000");
});