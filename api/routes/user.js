import express from "express";
import {
    getAllPlants,
    getAchievements,
    earnAchievement,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getallplants/:userId", getAllPlants);
router.get("/getachievements/:userId", getAchievements);
router.post("/earnachievement", earnAchievement);

export default router;
