import express from "express";
import {
    getAllPlants,
    getAchievements,
    getFlowerpots,
    getAllFlowerpots,
    buyFlowerpot,
    earnAchievement,
    updateLevel,
    updateProfilePicture,
    claimRewards,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getallplants/:userId", getAllPlants);
router.get("/getachievements/:userId", getAchievements);
router.get("/getflowerpots/:userId", getFlowerpots);
router.get("/getallflowerpots/:userId", getAllFlowerpots);
router.post("/buyflowerpot", buyFlowerpot);
router.post("/earnachievement", earnAchievement);
router.put("/updatelevel", updateLevel);
router.put("/updatepfp", updateProfilePicture);
router.put("/claimrewards", claimRewards);

export default router;
