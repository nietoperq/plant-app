import styled from "styled-components";

export const AddPlant = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 30px 50px;

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
            cursor: pointer;
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

export const SearchList = styled.div`
    height: 100px;
    overflow: auto;
    border-radius: 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    padding: 0 10px;
    accent-color: #9a7961;

    input {
        display: none;

        & + label {
            display: block;
            line-height: 24px;
        }

        &:hover + label {
            color: ${({ theme }) => theme.colors.primary};
        }

        &:checked + label {
            color: ${({ theme }) => theme.colors.primary};
            font-weight: 700;
        }
    }
`;
