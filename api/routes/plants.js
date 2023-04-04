import express from "express";
import {
    getAllPlants,
    getUserSites,
    getPlantsInSite,
    waterPlant,
    fertilizePlant,
    setFlowerpot,
    addingSite,
    deleteSite,
    addPlantToSite,
    deletePlantFromSite,
} from "../controllers/plants.js";

const router = express.Router();

router.get("/getall", getAllPlants);
router.get("/usersites/:userId", getUserSites);
router.get("/siteplants/:siteId", getPlantsInSite);
router.get("/water/:siteHasPlantId", waterPlant);
router.get("/fertilize/:siteHasPlantId", fertilizePlant);
router.put("/setflowerpot", setFlowerpot);
router.post("/addsite", addingSite);
router.delete("/deletesite/:siteId", deleteSite);
router.post("/addplanttosite", addPlantToSite);
router.delete("/deleteplantfromsite/:siteHasPlantId", deletePlantFromSite);

export default router;
