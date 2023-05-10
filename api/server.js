import express from "express";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import plantsRoutes from "./routes/plants.js";
import userRoutes from "./routes/user.js";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantsRoutes);
app.use("/api/user", userRoutes);

app.listen(8800, () => {
    console.log("Connected!");
});

const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_USER,
    subject: "Email from Node-App: A Test Message!",
    text: "Some content to send",
};

const transporter = nodemailer.createTransport({
    host: "smtp.zoho.eu",
    secure: true,
    port: 465,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

cron.schedule("0 18 * * *", () => {
    // Send e-mail everyday at 6pm
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
});
