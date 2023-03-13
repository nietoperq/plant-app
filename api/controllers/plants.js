import db from "../db.js";

export function getUserSites(req, res) {
    // if (req.user.id == req.params.userId) {
    const q = "SELECT * FROM site WHERE user_id = ?";
    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.json(err);

        res.status(200).json(data);
    });
    // } else {
    //     res.status(403).json("Access forbidden")
    // }
}

export function getPlantsInSite(req, res) {
    // if (req.user.id == req.params.userId) {
    const q =
        "SELECT * FROM site_has_plant s JOIN plant p ON s.plant_id=p.plant_id WHERE s.site_id = ?";
    db.query(q, [req.params.siteId], (err, data) => {
        if (err) return res.json(err);

        res.status(200).json(data);
    });
    // } else {
    //     res.status(403).json("Access forbidden")
    // }
}

export function waterPlant(req, res) {
    const q = "CALL water_plant(?)";
    db.query(q, [req.params.siteHasPlantId], (err, data) => {
        if (err) return res.json(err);
        res.status(200).json("Plant watered successfully");
    });
}

export function fertilizePlant(req, res) {
    const q = "CALL fertilize_plant(?)";
    db.query(q, [req.params.siteHasPlantId], (err, data) => {
        if (err) return res.json(err);
        res.status(200).json("Plant fertilized successfully");
    });
}
