import express from "express";
import { getUserSites, getPlantsInSite } from "../controllers/plants.js";
import verifyJWT from "../middleware/verifyJWT.js"

const router = express.Router();

router.get("/usersites/:userId", getUserSites);
router.get("/siteplants/:siteId", getPlantsInSite);


export default router;
