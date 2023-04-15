import styled from "styled-components";

export const Settings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 20px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
            display: none;
        }

        label {
            margin: 10px;
            cursor: pointer;
            transition: 0.2s ease;
            filter: contrast(70%);

            img {
                width: 100px;
                height: 100px;
            }

            &:hover {
                scale: 1.05;
                filter: contrast(100%);
            }

            &:active {
                scale: 1;
                transition: 0.1s ease;
            }
        }

        input:checked + label {
            filter: contrast(100%);
        }
    }
`;

export const PictureList = styled.div`
    display: flex;
    flex-wrap: wrap;
`;
