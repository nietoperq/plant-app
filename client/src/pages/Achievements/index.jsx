import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import Sidebar from "../../components/Sidebar";
import AchievementCard from "../../components/AchievementCard";
import axios from "axios";

import * as Pages from "../../shared_styles/Pages";

function Achievements() {
    const { userAchievements } = useContext(AuthContext);

    const achievementList = userAchievements?.map((achievement) => (
        <AchievementCard
            key={achievement.achievement_id}
            achievement={achievement}
        />
    ));

    return (
        <Pages.Container>
            <Sidebar />
            <Pages.Section>
                <h2>Your achievements:</h2>
                <Pages.WrapSectionElements>
                    {achievementList}
                </Pages.WrapSectionElements>
            </Pages.Section>
        </Pages.Container>
    );
}

export default Achievements;
