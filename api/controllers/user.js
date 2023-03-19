import db from "../db.js";

export function getAllPlants(req, res) {
    const q =
        "SELECT * FROM site s JOIN site_has_plant p ON s.site_id=p.site_id  WHERE s.user_id = ?";

    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.json(err);

        res.status(200).json(data);
    });
}

export function getAchievements(req, res) {
    const q = "CALL get_user_achievements(?)";

    db.query(q, [req.params.userId], (err, data) => {
        if (err) return res.json(err);

        res.status(200).json(data[0]);
    });
}

export function earnAchievement(req, res) {
    const q =
        "INSERT INTO user_has_achievement (user_id, achievement_id, unlocked_on) VALUES (?) ";

    const values = [req.body.user_id, req.body.achievement_id, new Date()];

    db.query(q, [values], (err, data) => {
        if (err) return res.json(err);
        return res.status(200).json("Achievement has been added");
    });
}