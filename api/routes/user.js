import express from "express";
import {
    getAllPlants,
    getAchievements,
    getFlowerpots,
    earnAchievement,
    updateLevel,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getallplants/:userId", getAllPlants);
router.get("/getachievements/:userId", getAchievements);
router.get("/getflowerpots/:userId", getFlowerpots);
router.post("/earnachievement", earnAchievement);
router.put("/updatelevel", updateLevel);

export default router;
