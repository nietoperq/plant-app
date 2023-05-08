import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Weather from "../../components/Weather";
import SiteCard from "../../components/SiteCard";
import PlantCard from "../../components/PlantCard";
import PlantDetails from "../../components/PlantDetails";
import AddSite from "../../components/AddSite";
import AddPlant from "../../components/AddPlant";
import Modal from "../../components/Modal";
import Notification from "../../components/Notification";
import Confetti from "react-confetti";

import { HiOutlineTrash } from "react-icons/hi";
import { TbAward } from "react-icons/tb";

import * as Pages from "../../shared_styles/Pages";
import * as Styled from "./styles";

function Dashboard() {
    const { currentUser, userAchievements, newAchievement } =
        useContext(AuthContext);
    const [userSites, setUserSites] = useState([]);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentSitePlants, setCurrentSitePlants] = useState([]);
    const [currentPlant, setCurrentPlant] = useState(null);
    const [addingSite, setAddingSite] = useState(false);
    const [deletingSite, setDeletingSite] = useState(false);
    const [addingPlant, setAddingPlant] = useState(false);
    const [deletingPlant, setDeletingPlant] = useState(false);
    const [achievementName, setAchievementName] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `/plants/usersites/${currentUser.user_id}`
                );
                setUserSites(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `/plants/siteplants/${currentSite}`
                );
                setCurrentSitePlants(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentSite]);

    useEffect(() => {
        if (newAchievement) {
            setAchievementName(
                userAchievements?.find(
                    (achievement) =>
                        achievement.achievement_id == newAchievement
                ).name
            );
        }
    }, [newAchievement]);

    function selectSite(event) {
        setCurrentSite(event.currentTarget.id);
    }

    function selectPlant(event) {
        currentPlant
            ? setCurrentPlant(null)
            : setCurrentPlant(event.currentTarget.id);
    }

    async function refreshPlantsData() {
        try {
            const res = await axios.get(`/plants/siteplants/${currentSite}`);
            setCurrentSitePlants(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function refreshSitesData() {
        try {
            const res = await axios.get(
                `/plants/usersites/${currentUser.user_id}`
            );
            setUserSites(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function deleteSite() {
        try {
            await axios.delete(`/plants/deletesite/${currentSite}`);
        } catch (err) {
            console.log(err);
        }
        refreshSitesData();
        setCurrentSite(null);
        setDeletingSite(false);
    }

    async function deletePlant() {
        try {
            await axios.delete(`/plants/deleteplantfromsite/${currentPlant}`);
            setCurrentPlant(null);
            setDeletingPlant(false);
            refreshPlantsData();
        } catch (err) {
            console.log(err);
        }
    }

    const siteList = userSites.map((site) => (
        <SiteCard
            key={site.site_id}
            siteId={site.site_id}
            name={site.name}
            icon={site.icon}
            handleClick={selectSite}
        />
    ));

    const plants = currentSitePlants.map((plant) => (
        <PlantCard
            key={plant.site_has_plant_id}
            plant={plant}
            handleClick={selectPlant}
        />
    ));

    return (
        <>
            <Pages.Container>
                <Sidebar />
                <Styled.DashboardGrid>
                    <Styled.WeatherSection style={{ gridArea: "w" }}>
                        <Weather />
                    </Styled.WeatherSection>
                    <Pages.Section style={{ gridArea: "s" }}>
                        <h2>Your sites </h2>
                        {userSites.length > 0 ? (
                            <Styled.DashboardSectionElements>
                                {siteList}
                            </Styled.DashboardSectionElements>
                        ) : (
                            <h3 style={{ padding: "20px 0" }}>
                                You haven't created any site yet
                            </h3>
                        )}
                        <Styled.ClickableSpan
                            onClick={() => setAddingSite((prev) => !prev)}
                        >
                            Add new site
                        </Styled.ClickableSpan>
                    </Pages.Section>

                    {currentSite && (
                        <Pages.Section style={{ gridArea: "p" }}>
                            {userSites.length > 0 && (
                                <>
                                    <h2>
                                        Your plants in {}
                                        <span>
                                            {
                                                userSites.find(
                                                    (site) =>
                                                        site.site_id ==
                                                        currentSite
                                                )?.name
                                            }
                                        </span>
                                    </h2>
                                    <Styled.ClickableSpan
                                        onClick={() => setDeletingSite(true)}
                                    >
                                        Delete site
                                    </Styled.ClickableSpan>
                                    <Styled.ClickableSpan
                                        onClick={() => setAddingPlant(true)}
                                    >
                                        Add new plant
                                    </Styled.ClickableSpan>
                                </>
                            )}
                            <Styled.DashboardSectionElements>
                                {plants}
                            </Styled.DashboardSectionElements>

                            {currentSite && currentSitePlants.length === 0 && (
                                <h3 style={{ padding: "20px 0 40px" }}>
                                    This site is empty
                                </h3>
                            )}
                        </Pages.Section>
                    )}

                    {currentPlant && (
                        <Modal handleClick={selectPlant}>
                            <PlantDetails
                                refreshPlantsData={refreshPlantsData}
                                plant={currentSitePlants.find(
                                    (plant) =>
                                        plant.site_has_plant_id == currentPlant
                                )}
                                closeModal={() => setCurrentPlant(null)}
                                delete={() => setDeletingPlant(true)}
                            />
                        </Modal>
                    )}

                    {addingSite && (
                        <Modal
                            handleClick={() => setAddingSite((prev) => !prev)}
                        >
                            <AddSite
                                refreshSitesData={refreshSitesData}
                                closeModal={() => setAddingSite(false)}
                            />
                        </Modal>
                    )}

                    {deletingSite && (
                        <Modal handleClick={() => setDeletingSite(false)}>
                            <Styled.DeleteConfirmation>
                                <HiOutlineTrash />
                                Are you sure you want to delete this site?
                                <div>
                                    <span onClick={deleteSite}>Yes</span>
                                    <span
                                        onClick={() => setDeletingSite(false)}
                                    >
                                        Cancel
                                    </span>
                                </div>
                            </Styled.DeleteConfirmation>
                        </Modal>
                    )}

                    {addingPlant && (
                        <Modal handleClick={() => setAddingPlant(false)}>
                            <AddPlant
                                siteId={currentSite}
                                refreshPlantsData={refreshPlantsData}
                                closeModal={() => setAddingPlant(false)}
                            />
                        </Modal>
                    )}

                    {deletingPlant && (
                        <Modal handleClick={() => setDeletingPlant(false)}>
                            <Styled.DeleteConfirmation>
                                <HiOutlineTrash />
                                Are you sure you want to delete this plant?
                                <div>
                                    <span onClick={deletePlant}>Yes</span>
                                    <span
                                        onClick={() => setDeletingPlant(false)}
                                    >
                                        Cancel
                                    </span>
                                </div>
                            </Styled.DeleteConfirmation>
                        </Modal>
                    )}
                </Styled.DashboardGrid>
            </Pages.Container>
            <Notification show={newAchievement}>
                <Styled.AchievementNotification>
                    <TbAward />
                    <div>
                        <p>Achievement unlocked!</p>
                        <p>
                            <em>{achievementName}</em>
                        </p>
                        <Link to="/achievements">See all achievements</Link>
                    </div>
                </Styled.AchievementNotification>
            </Notification>
            {newAchievement && (
                <Confetti
                    numberOfPieces={500}
                    recycle={false}
                    colors={["#FF8787", "#F8C4B4", "#E5EBB2", "#BCE29E"]}
                />
            )}
        </>
    );
}

export default Dashboard;
