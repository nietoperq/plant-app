import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import SiteCard from "../components/SiteCard";
import PlantCard from "../components/PlantCard";
import PlantDetails from "../components/PlantDetails";
import Modal from "../components/Modal";

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
        <div className="dashboard">
            <Sidebar />
            <div className="dashboard-content">
                <h1>Hello {currentUser.username}</h1>
                <h1>Your sites: </h1>
                {userSites.length > 0 ? (
                    <div className="site-list">{siteList}</div>
                ) : (
                    <h2>You haven't created any site yet</h2>
                )}
                {userSites.length > 0 && currentSite && (
                    <h1>
                        Your plants in{" "}
                        <span style={{ color: "OliveDrab" }}>
                            {userSites[currentSite - 1]?.name}
                        </span>
                        :
                    </h1>
                )}

                {currentSite && currentSitePlants.length === 0 && (
                    <h2>This site is empty</h2>
                )}

                <div className="plant-list">{plants}</div>

                {currentPlant && (
                    <Modal handleClick={selectPlant}>
                        <PlantDetails
                            plant={currentSitePlants.find(
                                (plant) => plant.plant_id == currentPlant
                            )}
                        />
                    </Modal>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
