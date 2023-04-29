import styled from "styled-components";

export const AchievementCard = styled.div`
    color: #555;
    position: relative;
    width: 250px;
    height: 200px;
    background: #fff;
    border-radius: 20px;
    margin: 45px 20px 20px 20px;
    padding: 20px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const AchievementIcon = styled.img`
    //outline: 1px solid grey;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    bottom: 100px;
    width: 150px;
    margin: auto;
`;

export const AchievementInfo = styled.div`
    left: 0;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: end;
    width: 100%;
    height: 100%;
    line-height: 30px;

    span {
        display: block;
        font-size: 14px;
        opacity: 70%;
    }
`;
