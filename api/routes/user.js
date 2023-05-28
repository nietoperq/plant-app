import express from "express";
import verifyJWT from "../middleware/verifyJWT.js";
import {
    getAllPlants,
    getAchievements,
    getFlowerpots,
    getAllFlowerpots,
    buyFlowerpot,
    earnAchievement,
    updateLevel,
    updateProfilePicture,
    updateEmailPreferences,
    claimRewards,
} from "../controllers/user.js";

const router = express.Router();

router.get("/getallplants/:userId", verifyJWT, getAllPlants);
router.get("/getachievements/:userId", verifyJWT, getAchievements);
router.get("/getflowerpots/:userId", verifyJWT, getFlowerpots);
router.get("/getallflowerpots/:userId", verifyJWT, getAllFlowerpots);
router.post("/buyflowerpot", buyFlowerpot);
router.post("/earnachievement", earnAchievement);
router.put("/updatelevel", updateLevel);
router.put("/updatepfp", updateProfilePicture);
router.put("/updateemailnotification", updateEmailPreferences);
router.put("/claimrewards", claimRewards);

export default router;
