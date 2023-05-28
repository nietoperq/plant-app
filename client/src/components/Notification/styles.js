import styled from "styled-components";

export const Notification = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    max-width: calc(100vw - 40px);
    height: 100px;
    padding: 10px;
    overflow: hidden;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    background: #fff;
    border-radius: 20px;
    transition: 1s ease;
    z-index: 100;

    &.hide {
        opacity: 0;
        transform: translateY(100%);
    }

    &.show {
        opacity: 1;
        transform: translateY(0);
    }
`;
