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
import React, { useState } from "react";
import { getUserCoin } from "../../../api/modules/user/profile";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Flex, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const auth = useSelector(getUserSelector);
  const profile = useSelector(getProfileSelector);
  const { actions } = UserSlice();
  const [coin, setCoin] = useState(0);
  const [opened, setOpened] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    const fetchUserCoin = async () => {
      try{
        const response = await getUserCoin(auth.token);
        const {coin} = response?.data?.data;
        setCoin(coin);
      }catch(err){
        console.log(err);
      }
    };
    fetchUserCoin();
  },[])
  const onLogout = () => {
    setOpened(true);
    
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
              <StyledLink
                href="/user/profile"
                color="#21231D"
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                title={`${profile?.nickname} - ${auth?.username}`}
              />
              <StyledImage
                onClick={() => {navigate('user/profile')}}
                src={profile?.avatar}
                width={50}
                height={50}
              />
             <StyledLabel title={`${coin}`} color="black" />
             <FontAwesomeIcon icon={faCoins} color="red" />
              <StyledLink
                color="#21231D"
                fontSize={StyleConstants.FONT_SIZE_SMALL}
                title={"Đăng xuất"}
                onClick={onLogout}
              />
              <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Bạn có chắc muốn đăng xuất?"
      >
        <Flex gap={'12px'} justify={'center'} sx={{width: '100%'}}>
          <Button
          onClick={() => {dispatch(actions.logoutSuccess())}}
          >
            {'Xác nhận'}
          </Button>

          <Button
          onClick={() => {setOpened(false)}}
          >
            {'Huỷ'}
          </Button>
        </Flex>
        
      </Modal>
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
  min-height: 70px;
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
