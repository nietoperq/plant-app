import React from "react";

import { RiCopperDiamondLine, RiCheckboxCircleLine } from "react-icons/ri";

import * as Styled from "./styles";
import * as Pages from "../../shared_styles/Pages";

function FlowerpotCard(props) {
    const { name, is_purchased, flowerpot_id, price } = props.flowerpot;

    const filename = flowerpot_id
        ? name.toLowerCase().replace(/ /g, "_")
        : "default";
    const imageSrc = `/img/flowerpots/${filename}.png`;

    return (
        <Styled.FlowerpotCard>
            <img src={imageSrc} />
            {name}
            {is_purchased ? (
                <button disabled={true}>
                    <RiCheckboxCircleLine /> owned
                </button>
            ) : (
                <button id={flowerpot_id} onClick={props.handleClick}>
                    <RiCopperDiamondLine />
                    {price}
                </button>
            )}
        </Styled.FlowerpotCard>
    );
}

export default FlowerpotCard;
