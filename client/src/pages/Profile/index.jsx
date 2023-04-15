import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import Sidebar from "../../components/Sidebar";

import avatar from "../../img/pfp.jpg";

import * as Styled from "./styles";
import * as Pages from "../../shared_styles/Pages";

function Profile() {
    const { currentUser, userAchievements } = useContext(AuthContext);
    const [usersSites, setUsersSites] = useState([]);
    const [usersPlants, setUsersPlants] = useState([]);

    const img_src = currentUser.icon
        ? "/img/profile_pictures/" + currentUser.icon
        : "/img/profile_pictures/default.jpg";

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `/plants/usersites/${currentUser.user_id}`
                );
                setUsersSites(res.data);
            } catch (err) {
                console.log(err);
            }

            try {
                const res = await axios.get(
                    `/user/getallplants/${currentUser.user_id}`
                );
                setUsersPlants(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    const achievementsNumber = userAchievements.filter(
        (achievement) => achievement.unlocked_on != null
    ).length;

    const numberOfPlants = usersPlants.length;
    const numberOfSites = usersSites.length;

    const totalWateringCounter = usersPlants.reduce(
        (acc, obj) => acc + obj.watering_counter,
        0
    );

    const totalFertilizingCounter = usersPlants.reduce(
        (acc, obj) => acc + obj.fertilizing_counter,
        0
    );

    return (
        <Pages.Container>
            <Sidebar />
            <Pages.Section>
                <Styled.ProfileHeader>
                    <img src={img_src} alt="" />
                    <Styled.HeaderStats>
                        <div>
                            <p>
                                <span>{currentUser.xp}</span>
                                XP
                            </p>
                            <p>
                                <span>{currentUser.lvl}</span>
                                LVL
                            </p>
                            <p>
                                <span>{currentUser.currency}</span>
                                coins
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>{currentUser.username}</span>
                                {currentUser.email}
                            </p>
                        </div>
                        <div>
                            <p>
                                <span>{currentUser.site_slots}</span>
                                Site slots
                            </p>
                            <p>
                                <span>{currentUser.plant_slots}</span>
                                Plant slots
                            </p>
                        </div>
                    </Styled.HeaderStats>
                </Styled.ProfileHeader>
            </Pages.Section>
            <Pages.Section>
                <Styled.Flex>
                    <Styled.ProfileCard>
                        <p>
                            <span>
                                {achievementsNumber}/{userAchievements.length}
                            </span>
                            Achievements unlocked
                        </p>
                    </Styled.ProfileCard>
                    <Styled.ProfileCard>
                        <p>
                            <span>{numberOfSites}</span>Number of sites
                        </p>
                    </Styled.ProfileCard>
                    <Styled.ProfileCard>
                        <p>
                            <span>{numberOfPlants}</span>Number of plants
                        </p>
                    </Styled.ProfileCard>
                    <Styled.ProfileCard>
                        <p>
                            <span>{totalWateringCounter}</span>Total watering
                            counter
                        </p>
                    </Styled.ProfileCard>
                    <Styled.ProfileCard>
                        <p>
                            <span>{totalFertilizingCounter}</span>Total
                            fertilizing counter
                        </p>
                    </Styled.ProfileCard>
                </Styled.Flex>
            </Pages.Section>
        </Pages.Container>
    );
}

export default Profile;
