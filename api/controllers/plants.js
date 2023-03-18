import db from "../db.js";

export function getAllPlants(req, res) {
    const q = "SELECT * FROM plant";

    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json(data);
    });
}

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

export function addingSite(req, res) {
    const q =
        "INSERT INTO site(user_id, name, description, icon, is_indoor, humidity_level, light_level) VALUES (?)";
    const values = [
        req.body.user_id,
        req.body.name,
        req.body.description,
        req.body.icon,
        req.body.is_indoor,
        req.body.humidity_level,
        req.body.light_level,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Site has been created");
    });
}

export function deleteSite(req, res) {
    const q = "DELETE FROM site WHERE site_id = ?";

    db.query(q, [req.params.siteId], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Site has been deleted");
    });
}

export function addPlantToSite(req, res) {
    const q =
        "INSERT INTO site_has_plant (site_id, plant_id, date_added, last_watered, last_fertilized, note) VALUES (?)";
    const values = [
        req.body.site_id,
        req.body.plant_id,
        req.body.date_added,
        req.body.last_watered,
        req.body.last_fertilized,
        req.body.note,
    ];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Plant has been added");
    });
}

export function deletePlantFromSite(req, res) {
    const q = "DELETE FROM site_has_plant WHERE site_has_plant_id = ?";

    db.query(q, [req.params.siteHasPlantId], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Plant has been deleted");
    });
}
