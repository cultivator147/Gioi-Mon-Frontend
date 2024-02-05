import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../../components/PageWrapper";
import { MainStory } from "../../components/StoryDetail/MainStory";
import { Story } from "../../components/StoryDetail";
import { StyleConstants } from "../../../styles/StyleConstants";
import Footer from "../../components/Footer/Footer";

export const StoryPage = () => {
  return (
    <Wrapper>
      <Header />
      <NavBarWrapper />
      <Story />
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


