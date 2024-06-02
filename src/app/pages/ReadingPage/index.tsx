import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import { ReadingScreen } from "./ReadingScreen";

export const ReadingPage = () => {
    return (
      <Wrapper>
        <ReadingScreen/>
      </Wrapper>
    );
  };
  const Wrapper = styled(PageWrapper)`
    flex-direction: column;
  `;