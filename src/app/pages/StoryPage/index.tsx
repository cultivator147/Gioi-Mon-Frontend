import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import { Story } from "../../components/StoryDetail";
export const StoryPage = () => {
  return (
    <Wrapper>
      <Story />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  flex-direction: column;
`;
