import express from "express";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";
import cron from "node-cron";
import dotenv from "dotenv";

import db from "./db.js";

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

// Loop through the result set, grouping plants by the user
function sendReminderEmails(results) {
    const [rows] = results;
    const plantsByUser = {};
    rows.forEach((row) => {
        const user = row.username;
        const email = row.email;
        const plant = row.primary_name;
        const type = row.notification_type;
        if (!plantsByUser[user]) {
            plantsByUser[user] = [];
        }
        plantsByUser[user].push({ name: plant, email: email, type: type });
    });

    // Send an email to each user containing a list of their plants that require care
    for (const user in plantsByUser) {
        const plants = plantsByUser[user];
        let message = `Dear ${user},\n\nRemember to take care of your plants! 🪴\n\nThese plants need care today:\n\n`;
        plants.forEach((plant) => {
            message += `• ${plant.name} - ${plant.type}\n`;
        });

        message += `\nBe sure to log the completed tasks in your profile.\n\n Happy planting,\nCatLeaf`;

        const transporter = nodemailer.createTransport({
            host: "smtp.zoho.eu",
            secure: true,
            port: 465,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER, // only for testing, in production it should be user's email
            subject: "CatLeaf - Plant Care Reminder",
            text: message,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    }
}

cron.schedule("0 18 * * *", () => {
    // Send e-mails everyday at 6pm
    const sql = "CALL get_email_data()";
    db.query(sql, function (error, results) {
        if (error) throw error;
        // results is an array of objects representing the data
        sendReminderEmails(results);
    });
});
