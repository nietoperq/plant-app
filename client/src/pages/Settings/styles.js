import styled from "styled-components";

export const Settings = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr;
    border-top: 1px solid #ddd;
    padding: 20px 0;
    margin: 20px 0;

    p,
    span {
        font-size: 14px;
        margin-top: 15px;
    }

    h4 {
        color: ${({ theme }) => theme.colors.font};
    }

    form {
        display: flex;
        flex-direction: column;
        max-width: 500px;
    }

    img {
        width: 80px;
    }

    input {
        border: none;
        border-radius: 10px;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        padding: 10px;
        margin: 5px 0 10px 0;
    }

    input:focus,
    textarea:focus {
        outline: none;
    }

    label {
        font-size: 14px;
    }

    input[type="radio"] {
        display: none;
    }

    input[type="radio"] + label {
        cursor: pointer;

        img {
            margin: 10px 20px 10px 0;
            transition: scale 0.5s ease;
        }

        &:hover {
            img {
                scale: 1.1;
            }
        }
    }

    input[type="radio"]:checked + label {
        img {
            scale: 1.2;
        }
    }

    button {
        cursor: pointer;
        border: none;
        color: #fff;
        background-color: ${({ theme }) => theme.colors.primary};
        padding: 5px;
        margin: 20px 20px 0 0;
        border-radius: 100px;
        width: 100px;

        &:hover {
            filter: brightness(110%);
        }

        &:active {
            scale: 0.99;
        }

        &:active {
            scale: 0.99;
        }
    }

    .switch {
        position: relative;
        display: inline;
        width: 50px;
        height: 26px;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        border-radius: 100px;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }

    input:checked + .slider {
        background-color: ${({ theme }) => theme.colors.primary};
    }

    input:checked + .slider:before {
        transform: translateX(24px);
    }

    .switch-container {
        display: flex;
        align-items: center;
    }

    .switch-text {
        margin: 0 10px 0 0;
        font-size: 14px;
    }
`;
