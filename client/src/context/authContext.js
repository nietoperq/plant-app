import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [userAchievements, setUserAchievements] = useState([]);
    const [newAchievement, setNewAchievement] = useState(null);

    async function login(inputs) {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data);
    }

    async function logout() {
        await axios.post("/auth/logout");
        setCurrentUser(null);
        setUserAchievements([]);
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    async function refreshAuthContext() {
        checkAchievements();

        if (currentUser) {
            const user = await axios.get(
                `/auth/userdata/${currentUser.user_id}`
            );
            setCurrentUser(user.data);
            const achievements = await axios.get(
                `/user/getachievements/${currentUser.user_id}`
            );
            setUserAchievements(achievements.data);
        }
    }

    async function calculateLevel() {
        const x = 0.07;
        const y = 2;
        const level = currentUser.xp
            ? Math.floor(x * Math.pow(currentUser.xp, 1 / y))
            : 0;

        if (level > currentUser.lvl) {
            await axios.put("/user/updatelevel", {
                level,
                user_id: currentUser.user_id,
            });
            const user = await axios.get(
                `/auth/userdata/${currentUser.user_id}`
            );
            setCurrentUser(user.data);
        }
    }

    async function checkAchievements() {
        let usersPlants = [];

        try {
            const res = await axios.get(
                `/user/getallplants/${currentUser.user_id}`
            );
            usersPlants = res.data;
        } catch (err) {
            console.log(err);
        }

        // check for water plants achievements

        const totalWateringCounter = usersPlants.reduce(
            (acc, obj) => acc + obj.watering_counter,
            0
        );

        if (totalWateringCounter >= 1) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Waterbender I"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalWateringCounter >= 10) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Waterbender II"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalWateringCounter >= 50) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Waterbender III"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalWateringCounter >= 100) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Waterbender IV"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalWateringCounter >= 500) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Waterbender V"
            ).achievement_id;
            earnAchievement(achievementId);
        }

        // check for fertilize plant achievements

        const totalFertilizingCounter = usersPlants.reduce(
            (acc, obj) => acc + obj.fertilizing_counter,
            0
        );

        if (totalFertilizingCounter >= 1) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Earthbender I"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalFertilizingCounter >= 5) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Earthbender II"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalFertilizingCounter >= 25) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Earthbender III"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalFertilizingCounter >= 50) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Earthbender IV"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (totalFertilizingCounter >= 100) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Earthbender V"
            ).achievement_id;
            earnAchievement(achievementId);
        }

        // check for flowerpots achievements

        //"/getflowerpots/:userId"

        let flowerpotsCount = 0;

        try {
            const res = await axios.get(
                `/user/getflowerpots/${currentUser.user_id}`
            );
            flowerpotsCount = res.data.length;
        } catch (err) {
            console.log(err);
        }

        if (flowerpotsCount >= 1) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Collector I"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (flowerpotsCount >= 5) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Collector II"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (flowerpotsCount >= 10) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Collector IV"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (flowerpotsCount >= 20) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Collector V"
            ).achievement_id;
            earnAchievement(achievementId);
        }
        if (flowerpotsCount >= 30) {
            const achievementId = userAchievements.find(
                (achievement) => achievement.name === "Collector III"
            ).achievement_id;
            earnAchievement(achievementId);
        }
    }

    async function earnAchievement(achievement_id) {
        // check if achievement was already unlocked
        const unlocked_on = userAchievements.find(
            (achievement) => achievement.achievement_id === achievement_id
        ).unlocked_on;

        if (!unlocked_on) {
            setNewAchievement(achievement_id);
            await axios.post("/user/earnAchievement", {
                user_id: currentUser.user_id,
                achievement_id,
            });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                try {
                    const res = await axios.get(
                        `/user/getachievements/${currentUser.user_id}`
                    );
                    setUserAchievements(res.data);
                } catch (err) {
                    console.log(err);
                }
            }
        };
        fetchData();
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        if (newAchievement) {
            sleep(5000).then(() => {
                setNewAchievement(false);
            });
        }
    }, [newAchievement]);

    useEffect(() => {
        if (currentUser) {
            calculateLevel();
        }
    }, [currentUser]);

    //TODO: remove user data from localStorage after jwt expires

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                userAchievements,
                newAchievement,
                login,
                logout,
                refreshAuthContext,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthContextProvider };
