import { NavBarWrapper } from "../../components/NavBar";
import { Header } from "../../components/Header";
import { MainHome } from "../../components/Main/MainHome";
import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { useEffect } from "react";
import { Feed } from "../../components/Feed/Feed";

export const FeedPage = () => {
  return (
    <Wrapper>
      <Feed />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  flex-direction: column;
`;
