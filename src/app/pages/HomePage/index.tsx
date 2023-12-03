import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";

export const HomePage = () => {
  return (
    <Wrapper>
      <Header />
      <NavBarWrapper />
      <MainHome />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


