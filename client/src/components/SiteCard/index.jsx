import React from "react";

import {
    MdBalcony,
    MdOutlineBed,
    MdOutlineKingBed,
    MdOutlineKitchen,
    MdWorkOutline,
    MdOutlineHome,
} from "react-icons/md";

import * as Styled from "./styles";

function SiteCard(props) {
    const { siteId, name, icon, handleClick } = props;

    function genIcon(icon) {
        switch (icon) {
            case "bedroom":
                return <MdOutlineBed />;
            case "balcony":
                return <MdBalcony />;
            case "livingroom":
                return <MdOutlineKingBed />;
            case "kitchen":
                return <MdOutlineKitchen />;
            case "office":
                return <MdWorkOutline />;
            default:
                return <MdOutlineHome />;
        }
    }

    const emoji = genIcon(icon);

    return (
        <Styled.SiteCard id={siteId} onClick={handleClick}>
            <Styled.SiteIcon>{emoji}</Styled.SiteIcon>
            <h3>{name}</h3>
        </Styled.SiteCard>
    );
}

export default SiteCard;
