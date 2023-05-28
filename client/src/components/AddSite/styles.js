import styled from "styled-components";

export const AddSite = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;

    h1 {
        color: ${({ theme }) => theme.colors.primary};
        font-size: 1.5rem;
    }

    p {
        color: #333;
        font-size: 16px;
        margin: 20px 0 0px 0;
        color: ${({ theme }) => theme.colors.primary};
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        input,
        textarea {
            border: none;
            border-radius: 10px;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            padding: 10px;
            margin: 10px 0;
        }

        input:focus,
        textarea:focus {
            outline: none;
        }

        label {
            font-size: 14px;
        }

        button {
            border: none;
            color: #fff;
            background-color: ${({ theme }) => theme.colors.primary};
            padding: 10px;
            margin-top: 30px;
            border-radius: 100px;
            cursor: pointer;
            transition: 0.3s ease;

            &:hover {
                filter: brightness(110%);
            }

            &:active {
                scale: 0.99;
            }
        }
    }
`;

export const RadioGroup = styled.div`
    display: flex;
    gap: 10px;
`;

export const IconRadio = styled.div`
    position: relative;
    margin: 0.5rem;

    input {
        display: none;
    }

    input:checked + label {
        background-color: ${({ theme }) => theme.colors.primary};
        svg {
            color: #fff;
        }
    }

    label {
        width: 50px;
        height: 50px;
        display: inline-block;
        border-radius: 100px;
        position: relative;
        text-align: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        cursor: pointer;
        transition: 0.3s ease;

        &:hover {
            scale: 1.1;
        }

        svg {
            color: ${({ theme }) => theme.colors.primary};
            font-size: 30px;
            margin-top: 10px;
        }
    }
`;

export const TextRadio = styled.div`
    position: relative;
    margin: 0.5rem;

    input {
        display: none;
    }

    input:checked + label {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;

        &:before {
            content: "✓";
            font-size: 15px;
            font-weight: 900;
            line-height: 8px;
            outline: 2px solid #fff;
            background-color: ${({ theme }) => theme.colors.primary};
        }
    }

    label {
        height: 30px;
        line-height: 20px;
        display: inline-block;
        border-radius: 100px;
        padding: 5px 10px 5px 30px;
        position: relative;
        text-align: center;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        cursor: pointer;
        transition: 0.3s ease;

        &:hover {
            scale: 1.1;
        }

        &:before {
            content: "";
            position: absolute;
            width: 10px;
            height: 10px;
            top: 50%;
            left: 50%;
            transform: translate(0, -50%);
            left: 10px;
            border-radius: 50%;
            outline: 2px solid ${({ theme }) => theme.colors.primary};
            background-color: #fff;
        }
    }
`;
