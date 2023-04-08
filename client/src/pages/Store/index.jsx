import React, { useContext, useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import { AuthContext } from "../../context/authContext";
import axios from "axios";

import * as Styled from "./styles";
import * as Pages from "../../shared_styles/Pages";

function Store() {
    const { currentUser, refreshAuthContext } = useContext(AuthContext);
    const [flowerpots, setFlowerpots] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(
                    `/user/getallflowerpots/${currentUser.user_id}`
                );
                setFlowerpots(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [currentUser]);

    async function buyFlowerpot(e) {
        try {
            const res = await axios.post(`/user/buyflowerpot`, {
                user_id: currentUser.user_id,
                flowerpot_id: e.target.id,
            });
            if (res.data[0].result == "NOT_ENOUGH_CURRENCY") {
                setError("Not enough coins!");
            }
            refreshAuthContext();
        } catch (err) {
            console.log(err);
        }
    }
    console.log(error);

    const storeItems = flowerpots.map((flowerpot) => (
        <Styled.StoreCard>
            {flowerpot.name}
            {flowerpot.is_purchased ? (
                <button disabled={true}>owned</button>
            ) : (
                <button id={flowerpot.flowerpot_id} onClick={buyFlowerpot}>
                    {flowerpot.price}
                </button>
            )}
        </Styled.StoreCard>
    ));

    return (
        <Pages.Container>
            <Sidebar />
            <Pages.Section>
                <Styled.Error> {error}</Styled.Error>
                <Pages.WrapSectionElements>
                    {storeItems}
                </Pages.WrapSectionElements>
            </Pages.Section>
        </Pages.Container>
    );
}

export default Store;
