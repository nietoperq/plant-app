import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import SiteCard from "../components/SiteCard";
import PlantCard from "../components/PlantCard";
import PlantDetails from "../components/PlantDetails";
import Modal from "../components/Modal";

import { BsFillPlusCircleFill } from "react-icons/bs";

import * as Styled from "../components/_shared/Dashboard";

function Dashboard() {
    const { currentUser } = useContext(AuthContext);
    const [userSites, setUserSites] = useState([]);
    const [currentSite, setCurrentSite] = useState(null);
    const [currentSitePlants, setCurrentSitePlants] = useState([]);
    const [currentPlant, setCurrentPlant] = useState(null);

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
            key={plant.plant_id}
            plantId={plant.plant_id}
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
                </Styled.DashboardSection>

                {currentSite && (
                    <Styled.DashboardSection>
                        {userSites.length > 0 && (
                            <h2>
                                Your plants in {}
                                <span>{userSites[currentSite - 1]?.name}</span>:
                            </h2>
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
                                (plant) => plant.plant_id == currentPlant
                            )}
                        />
                    </Modal>
                )}
            </div>
        </Styled.Dashboard>
    );
}

export default Dashboard;
