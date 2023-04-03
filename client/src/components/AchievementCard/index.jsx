import React, { useState, useRef } from "react";
import * as Styled from "./styles";

function AchievementCard(props) {
    const { name, description, icon, unlocked_on } = props.achievement;

    const filename = unlocked_on ? icon : "locked";
    const imageSrc = `/img/achievements/${filename}.png`;

    return (
        <Styled.AchievementCard>
            <Styled.AchievementIcon src={imageSrc} alt="" />
            <Styled.AchievementInfo>
                {unlocked_on ? (
                    <p>
                        <strong>{name}</strong>
                        <span>Unlocked {unlocked_on}</span>
                    </p>
                ) : (
                    <p>
                        {name}
                        <span>To unlock:</span>
                    </p>
                )}
                <p>{description}</p>
            </Styled.AchievementInfo>
        </Styled.AchievementCard>
    );
}

export default AchievementCard;
