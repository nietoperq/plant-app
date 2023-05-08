import styled from "styled-components";

export const Weather = styled.div`
    #temp {
        font-size: 40px;
    }
    svg {
        font-size: 100px;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const WeatherDetails = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;

    svg {
        font-size: 40px;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

export const FlexRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
`;
