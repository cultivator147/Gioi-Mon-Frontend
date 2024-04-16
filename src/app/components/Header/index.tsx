import styled from "styled-components/macro";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Brand } from "./Brand";
import { Search } from "./Search";
import { StyledLink } from "../Common/StyledLink";
import { PageWrapper, SubWrapperRow } from "../PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getProfileSelector, getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { UserSlice } from "../../../redux-toolkit/slice/userSlice";
import React from "react";
export const Header = () => {
  const auth = useSelector(getUserSelector);
  const profile = useSelector(getProfileSelector);
  const { actions } = UserSlice();

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(actions.logoutSuccess());
  };
  return (
    <Wrapper>
      <SubWrapperRow>
        <First>
          <Brand />
        </First>
        <Center>
          <Search />
        </Center>
        <End>
          {auth.token !== "" ? (
            <>
              <StyledLabel
                color="#21231D"
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                title={`Xin chào, ${auth?.username}`}
              />
              <StyledImage
                src={profile?.avatar}
                width={50}
                height={50}
              />
              <StyledLink
                color="#21231D"
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                title={"Đăng xuất"}
                onClick={onLogout}
              />
            </>
          ) : (
            <>
              <StyledLink
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                color="#21231D"
                afterContent="/"
                title="Đăng nhập"
                underline={false}
                href="/auth"
              />
              <StyledLink
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                color="#21231D"
                title="Đăng ký"
                href="/auth/register"
                underline={false}
              />
            </>
          )}
        </End>
      </SubWrapperRow>
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  background-color: ${StyleConstants.BACKGROUND_HEADER_COLOR};
  ${SubWrapperRow} {
    padding: 4px 8px;
    justify-content: space-between;
  }
`;

const First = styled.div`
  width: 20%;
`;
const Center = styled.div`
  display: flex;
  width: 50%;

  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const End = styled.div`
  display: flex;
  width: 30%;
  justify-content: center;
  gap: 12px;
  align-items: center;
`;
