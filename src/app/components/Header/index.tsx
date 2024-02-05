import styled from "styled-components/macro";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Brand } from "./Brand";
import { Search } from "./Search";
import { StyledLink } from "../Common/StyledLink";
import { PageWrapper, SubWrapperRow } from "../PageWrapper";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { UserSlice } from "../../../redux-toolkit/slice/userSlice";
import React from "react";
export const Header = () => {
  const auth = useSelector(getUserSelector);
  const { actions } = UserSlice();

  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(actions.logoutSuccess());

  }
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
          {auth.token !== '' ? <>
            <StyledLabel color="#21231D" fontSize={StyleConstants.FONT_SIZE_SMALL}  title={`Xin chào, ${auth?.username}`}/>
            <StyledImage src={"https://th.bing.com/th/id/R.22a58b4e1063265995b8a8c51a09fe23?rik=gWBSa8fDnKsP0w&pid=ImgRaw&r=0"} width={50} height={50} />
            <StyledLink color="#21231D" fontSize={StyleConstants.FONT_SIZE_SMALL}  title={"Đăng xuất"} onClick={onLogout}/>
          </>: <>
          <StyledLink
            fontSize={StyleConstants.FONT_SIZE_SMALL}
            color="#21231D"
            afterContent="/"
            title="Đăng nhập"
            underline = {false}
            href="/login"
          />
          <StyledLink fontSize={StyleConstants.FONT_SIZE_SMALL} color="#21231D" title="Đăng ký" href="/register" underline = {false}/>
          </>}
          
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
