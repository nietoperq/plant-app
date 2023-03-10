import styled from "styled-components";

export const Modal = styled.div`
    width: 600px;
    max-height: 80vh;
    overflow: auto;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #fff;
    border-radius: 20px;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #00000054;
    display: flex;
    align-items: center;
    justify-content: center;
`;
