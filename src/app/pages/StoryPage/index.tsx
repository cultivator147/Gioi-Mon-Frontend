import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../../components/PageWrapper";
import { MainStory } from "../../components/StoryDetail/MainStory";
import { Story } from "../../components/StoryDetail";
import { StyleConstants } from "../../../styles/StyleConstants";

export const StoryPage = () => {
  return (
    <Wrapper>
      <Header />
      <NavBarWrapper />
      <Story />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


