import db from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function register(req, res) {
    // check if user exists
    const q = "SELECT * FROM user WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length) return res.status(409).json("User already exists!");

        //TODO: validate password

        // hash the password and create a user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(username, email, password) VALUES (?)";
        const values = [req.body.username, req.body.email, hash];

        db.query(q, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("User has been created");
        });
    });
}

export function login(req, res) {
    // check if user exists
    const q = "SELECT * FROM user WHERE username = ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        // check password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");

        // create a jwt and store it in httpOnly cookie
        const token = jwt.sign(
            { id: data[0].user_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        );
        const { password, ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other);
    });
}

export function logout(req, res) {
    res.clearCookie("access_token", {
        sameSite: "none",
        secure: true,
    })
        .status(200)
        .json("User has been logged out.");
}

export function userdata(req, res) {
    const q = "SELECT * FROM user WHERE user_id = ?";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        const { password, ...other } = data[0];

        const token = jwt.sign(
            { id: data[0].user_id, ...other },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "10s" }
        );

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(other);
    });
}

export function updatePassword(req, res) {
    const select = "SELECT * FROM user WHERE user_id = ?";

    db.query(select, [req.body.user_id], (err, data) => {
        if (err) return res.json(err);

        // check old password
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.old_password,
            data[0].password
        );

        if (!isPasswordCorrect)
            return res.status(400).json("Wrong old password");

        //check if both new passwords are the same
        const isConfirmPasswordCorrect =
            req.body.new_password == req.body.confirm_new_password;

        if (!isConfirmPasswordCorrect) {
            return res.status(400).json("Passwords don't match");
        }

        // change password
        const update = "UPDATE user SET password = ? WHERE user_id = ?";

        // hash new password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.new_password, salt);

        const values = [hash, req.body.user_id];

        db.query(update, values, (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Password updated");
        });
    });
}
