import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import { MainSearch } from "../../components/Main/MainSearch";
import Footer from "../../components/Footer/Footer";

export const SearchPage = () => {
  return (
    <Wrapper>
      <Header />
      <NavBarWrapper />
      <MainSearch />
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


