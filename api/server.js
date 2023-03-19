import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import plantsRoutes from "./routes/plants.js";
import userRoutes from "./routes/user.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/plants", plantsRoutes);
app.use("/api/user", userRoutes);

app.listen(8800, () => {
    console.log("Connected!");
});
