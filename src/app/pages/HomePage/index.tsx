import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { useEffect } from "react";

export const HomePage = () => {
  const auth = useSelector(getUserSelector);
  useEffect(() => {
    console.log(auth);
  }, [auth]);
  return (
    <Wrapper>
      <MainHome />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  flex-direction: column;
`;
