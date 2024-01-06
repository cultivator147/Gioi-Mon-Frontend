import styled from "styled-components";
import { ReadingHistory } from "./ReadingHistory";

export const SubRight = () => {
    return(
        <Wrapper>
            <ReadingHistory/>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;