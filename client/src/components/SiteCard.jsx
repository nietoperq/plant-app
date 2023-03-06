import React from "react";

function SiteCard(props) {
    const { siteId, name, icon, handleClick } = props;

    function genIcon(icon) {
        switch (icon) {
            case "bedroom":
                return "🛏️";
            case "balcony":
                return "🪟";
            case "livingroom":
                return "🛋️";
            default:
                return "🏡";
        }
    }

    const emoji = genIcon(icon);

    return (
        <div className="site-card" id={siteId} onClick={handleClick}>
            <h1>{emoji}</h1>
            <h1>{name}</h1>
        </div>
    );
}

export default SiteCard;
