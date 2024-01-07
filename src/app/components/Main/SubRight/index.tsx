import styled from "styled-components";
import { ReadingHistory } from "./ReadingHistory/ReadingHistory";
import { Leaderboard } from "./Leaderboard/Leaderboard";

export const SubRight = () => {
    return(
        <Wrapper>
            <ReadingHistory/>
            <Leaderboard/>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;