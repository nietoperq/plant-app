import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import Sidebar from "../../components/Sidebar";

import * as Styled from "./styles";
import * as Pages from "../../shared_styles/Pages";

import {
    RiStarLine,
    RiShieldStarLine,
    RiCopperDiamondLine,
    RiHome2Line,
    RiPlantLine,
    RiLockLine,
    RiCheckboxCircleLine,
    RiGiftLine,
} from "react-icons/ri";

function Profile() {
    const { currentUser, userAchievements, refreshAuthContext } =
        useContext(AuthContext);
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

    let rewardLevels = [];

    for (let i = 5; i <= 100; i += 5) {
        rewardLevels.push(i);
    }

    const rewards = rewardLevels.map((x) => {
        const message = `Reach level ${x} Reward: +5 plant slots  ${
            x % 10 == 0 ? "+1 site slot" : ""
        }`;

        if (x > currentUser.lvl) {
            //locked rewards
            return (
                <Styled.RewardsCard className="locked">
                    {message} <RiLockLine />
                </Styled.RewardsCard>
            );
        } else if (x / 5 <= currentUser.claimed_rewards) {
            //claimed rewards
            return (
                <Styled.RewardsCard className="claimed">
                    {message}
                    <RiCheckboxCircleLine />
                </Styled.RewardsCard>
            );
        } else {
            //unlocked rewards, not yet claimed
            return (
                <Styled.RewardsCard>
                    {message}
                    <span>
                        <RiGiftLine />
                    </span>
                </Styled.RewardsCard>
            );
        }
    });

    async function claimRewards() {
        try {
            const res = await axios.put(`/user/claimrewards`, {
                user_id: currentUser.user_id,
            });
            refreshAuthContext();
        } catch (err) {
            console.log(err);
        }
    }

    console.log(currentUser.lvl / 5);

    return (
        <>
            <Sidebar />
            <Pages.Container>
                <Styled.Grid>
                    <Styled.ProfileSection style={{ gridArea: "p" }}>
                        <img src={img_src} alt="" />
                        <Styled.FlexColumn>
                            <h2>{currentUser.username}</h2>
                            <span>{currentUser.email}</span>
                            <Styled.ProfileStats>
                                <Styled.ProfileStat>
                                    <RiShieldStarLine />
                                    <div>
                                        <span>{currentUser.lvl}</span>
                                        <p>LVL</p>
                                    </div>
                                </Styled.ProfileStat>
                                <Styled.ProfileStat>
                                    <RiStarLine />
                                    <div>
                                        <span>{currentUser.xp}</span>
                                        <p>XP</p>
                                    </div>
                                </Styled.ProfileStat>
                                <Styled.ProfileStat>
                                    <RiCopperDiamondLine />
                                    <div>
                                        <span>{currentUser.currency}</span>
                                        <p>coins</p>
                                    </div>
                                </Styled.ProfileStat>
                                <Styled.ProfileStat>
                                    <RiHome2Line />
                                    <div>
                                        <span>{currentUser.site_slots}</span>
                                        <p>site slots</p>
                                    </div>
                                </Styled.ProfileStat>
                                <Styled.ProfileStat>
                                    <RiPlantLine />
                                    <div>
                                        <span>{currentUser.plant_slots}</span>
                                        <p>plant slots</p>
                                    </div>
                                </Styled.ProfileStat>
                            </Styled.ProfileStats>
                        </Styled.FlexColumn>
                    </Styled.ProfileSection>
                    <Pages.Section style={{ gridArea: "s" }}>
                        <h2>Stats</h2>
                        <Styled.FlexRow>
                            <Styled.StatsCard>
                                <span>
                                    {achievementsNumber}/
                                    {userAchievements.length}
                                </span>
                                <p>Achievements unlocked</p>
                            </Styled.StatsCard>
                            <Styled.StatsCard>
                                <span>{totalWateringCounter}</span>
                                <p>Total watering counter</p>
                            </Styled.StatsCard>
                            <Styled.StatsCard>
                                <span>{totalFertilizingCounter}</span>
                                <p>Total fertilizing counter</p>
                            </Styled.StatsCard>
                            <Styled.StatsCard>
                                <span>{numberOfSites}</span>
                                <p>Number of sites</p>
                            </Styled.StatsCard>
                            <Styled.StatsCard>
                                <span>{numberOfPlants}</span>
                                <p>Number of plants</p>
                            </Styled.StatsCard>
                        </Styled.FlexRow>
                    </Pages.Section>
                    <Styled.RewardsSection style={{ gridArea: "r" }}>
                        <h2>Rewards</h2>
                        {currentUser.claimed_rewards <
                            Math.floor(currentUser.lvl / 5) && (
                            <button onClick={claimRewards}>
                                Claim rewards
                            </button>
                        )}
                        <Styled.RewardsList>{rewards}</Styled.RewardsList>
                    </Styled.RewardsSection>
                </Styled.Grid>
            </Pages.Container>
        </>
    );
}

export default Profile;
