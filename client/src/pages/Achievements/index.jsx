import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Sidebar from "../../components/Sidebar";
import axios from "axios";

import * as Pages from "../../shared_styles/Pages";

function Achievements() {
    const { userAchievements } = useContext(AuthContext);

    const achievementList = userAchievements?.map((achievement) => (
        <div key={achievement.achievement_id}>
            {achievement.unlocked_on ? (
                <p>
                    <strong>{achievement.name}</strong>
                </p>
            ) : (
                <p>{achievement.name}</p>
            )}
        </div>
    ));

    return (
        <Pages.Container>
            <Sidebar />
            <div>Achievements</div>
            {achievementList}
        </Pages.Container>
    );
}

export default Achievements;
