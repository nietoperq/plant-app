import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import SiteCard from "../components/SiteCard";
import PlantCard from "../components/PlantCard";
import PlantDetails from "../components/PlantDetails";
import AddSite from "../components/AddSite";
import AddPlant from "../components/AddPlant";
import Modal from "../components/Modal";

import { HiOutlineTrash } from "react-icons/hi";

import * as Styled from "../components/_shared/Dashboard";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [userSites, setUserSites] = useState([]);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentSitePlants, setCurrentSitePlants] = useState([]);
    const [currentPlant, setCurrentPlant] = useState(null);
    const [addingSite, setAddingSite] = useState(false);
    const [deletingSite, setDeletingSite] = useState(false);
    const [addingPlant, setAddingPlant] = useState(false);
    const [deletingPlant, setDeletingPlant] = useState(false);

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

    function selectSite(event) {
        setCurrentSite(event.currentTarget.id);
    }

    function selectPlant(event) {
        console.log("event:");
        console.log(event.currentTarget);
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
        console.log("deleting");
        console.log(currentPlant);
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

    console.log(currentSitePlants);

    const plants = currentSitePlants.map((plant) => (
        <PlantCard
            key={plant.site_has_plant_id}
            siteHasPlantId={plant.site_has_plant_id}
            name={plant.primary_name}
            icon={plant.icon}
            handleClick={selectPlant}
        />
    ));

    return (
        <Styled.Dashboard>
            <Sidebar />
            <div className="dashboard-content">
                <Styled.DashboardSection>
                    <h2>Your sites: </h2>
                    {userSites.length > 0 ? (
                        <Styled.DashboardSectionElements>
                            {siteList}
                        </Styled.DashboardSectionElements>
                    ) : (
                        <h2>You haven't created any site yet</h2>
                    )}
                    <span
                        style={{ cursor: "pointer" }}
                        onClick={() => setAddingSite((prev) => !prev)}
                    >
                        Add new site...
                    </span>
                </Styled.DashboardSection>

                {currentSite && (
                    <Styled.DashboardSection>
                        {userSites.length > 0 && (
                            <>
                                <h2>
                                    Your plants in {}
                                    <span>
                                        {
                                            userSites.find(
                                                (site) =>
                                                    site.site_id == currentSite
                                            )?.name
                                        }
                                    </span>
                                    :
                                </h2>
                                <span onClick={() => setDeletingSite(true)}>
                                    Delete site
                                </span>
                                <span onClick={() => setAddingPlant(true)}>
                                    Add new plant
                                </span>
                            </>
                        )}
                        <Styled.DashboardSectionElements>
                            {plants}
                        </Styled.DashboardSectionElements>

                        {currentSite && currentSitePlants.length === 0 && (
                            <h2>This site is empty</h2>
                        )}
                    </Styled.DashboardSection>
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
                    <Modal handleClick={() => setAddingSite((prev) => !prev)}>
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
                                <span onClick={() => setDeletingSite(false)}>
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
                                <span onClick={() => setDeletingPlant(false)}>
                                    Cancel
                                </span>
                            </div>
                        </Styled.DeleteConfirmation>
                    </Modal>
                )}
            </div>
        </Styled.Dashboard>
    );
}

export default Dashboard;
