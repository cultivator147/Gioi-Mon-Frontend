import { NavBar } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { Main } from "../../components/Main";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";

export const HomePage = () => {
  return (
    <Wrapper>
      <Header />
      <NavBar />
      <Main />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


