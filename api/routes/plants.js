import express from "express";
import {
    getUserSites,
    getPlantsInSite,
    waterPlant,
    fertilizePlant,
} from "../controllers/plants.js";

const router = express.Router();

router.get("/usersites/:userId", getUserSites);
router.get("/siteplants/:siteId", getPlantsInSite);
router.get("/water/:siteHasPlantId", waterPlant);
router.get("/fertilize/:siteHasPlantId", fertilizePlant);

export default router;
