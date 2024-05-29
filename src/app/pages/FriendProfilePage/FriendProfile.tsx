import {
  Avatar,
  BackgroundImage,
  Button,
  Center,
  Container,
  createStyles,
  Flex,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { ReactComponent as Settings } from "../../../assets/icons/settings.svg";
import { ReactComponent as Home } from "../../../assets/icons/home-05.svg";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { SubtleButton } from "../../components/Common/Button/SubtleButton";
import { Age } from "../../../utils/dateFormatter";
import { StyledLabel } from "../../components/Common/StyledLabel";
import { ListPost } from "../../components/Feed/ListPost";
import { TypeListPost } from "../../../api/interfaces/listPost";
import { getListPost } from "../../../api/modules/post/listPost";
import { BaseResponse } from "../../../utils/http/response";
import { getProfile } from "../../../api/modules/user/profile";
interface ProfileProps{
    userId: any;
    nickname?: any;
    avatar?:any;
    dateOfBirth?: any;
    zodiac?: any;
    gender?: any;
    introduction?: any;
    onboard?: any;
    location?: any;
    additionalInformation?: any;
    coin?: any;
    level?: any;
};
function FriendProfileScreen() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileProps>();
  const user = useSelector(getUserSelector);
  const profileId = useParams().profile_id || "0";
  // Local
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const isMobile = false;
  const [posts, setPosts] = useState([]);
  const [bgImg, setBgImg] = useState(
    "https://wallpapersmug.com/large/fc8c6a/beautiful-girl-anime-art-original-22.jpg"
  );
  React.useEffect(() => {
    const getProfileData = async () => {
      const res: BaseResponse = await getProfile(
        {
          userId: profileId,
        },
        null
      );
      console.log("data  profile: ", res.data);
      if (res.code === 0) {
        const data = res?.data;
        setProfile(data);
      }
    };

    const getPost = async () => {
      try {
        const params: TypeListPost = { friend_id: +profileId, page: 0, size: 10 };
        const response = await getListPost(user.token, params);
        const data = response?.data?.data;
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProfileData();
    getPost();
  }, []);
  const handleBackToHome = () => {
    navigate("/");
  };
  return (
    <Container fluid className={classes.container}>
      <BackgroundImage
        style={{
          position: "absolute",
          minHeight: "324px",
          maxHeight: "394px",
          aspectRatio: "7/2",
          zIndex: 0,
        }}
        src={bgImg}
      ></BackgroundImage>
      <Container fluid className={classes.subContainer}>
        <Flex className={classes.header}>
          <SubtleButton
            className={classes.homeBtn}
            variant="subtle"
            onClick={handleBackToHome}
          >
            {!isMobile && <Home />}
          </SubtleButton>

          <Stack align="center" spacing={0}>
            <Center className={classes.avatarWrapper}>
              <Avatar
                className={classes.avatar}
                radius={99}
                src={profile?.avatar}
              />
            </Center>
            <Text className={classes.nickname}>{`${profile?.nickname}, ${Age(
              profile?.dateOfBirth
            )}`}</Text>
          </Stack>
          <SubtleButton
            variant="subtle"
            onClick={() =>
              navigate("/setting", {
                state: {
                  animation: true,
                },
              })
            }
          >
            <Settings />
          </SubtleButton>
        </Flex>
        <Flex
          style={{
            justifyItems: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Flex
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: "16px",
              width: "60%",
            }}
          > */}
            {/* <StyledLabel title={"Coin"} color="black" />
            <StyledLabel title={profile?.coin || 0} color="black" /> */}
          {/* </Flex> */}
          {/* <Flex
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
            }}
          >
            <Flex gap={"6px"}>
              <StyledLabel title={"Level"} color="black" />
              <StyledLabel title={profile?.level || 1} color="black" />
            </Flex>
            TODO : Process bar here
            <Flex gap={"6px"}>
              <StyledLabel title={"Level"} color="black" />
              <StyledLabel title={profile?.level || 2} color="black" />
            </Flex>
          </Flex> */}
        </Flex>
        <Flex direction={"column"} gap={"16px"}>
          <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
          ta="start"
          style={{marginLeft: '64px'}}
          fz="xl"
          fw={700}
          >
          {"Thông tin cá nhân:"}
          </Text>
          <Flex direction={"column"} gap={"12px"}>
            <Flex className={classes.flexRow}>
              <Text
              style={{marginLeft: '76px'}}
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fw={700}
              >
                {"Nickname:"}
              </Text>
              <Text
              fz="xl"
              fw={800}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              variant="gradient"
              gradient={{ from: 'black', to: 'cyan', deg: 45 }}
              >
                {profile?.nickname}
              </Text>
            </Flex>
          </Flex>
          {/* TODO: Chọn danh hiệu */}
          <Flex
            direction={"column"}
            gap={"16px"}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ display: "flex" }}>
            <Text
              variant="gradient"
              gradient={{ from: 'red', to: 'cyan', deg: 45 }}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
              ta="center"
              fz="xl"
              fs="italic"
              fw={700}
              >
                Bài viết đã đăng
              </Text>
            </div>
            <div
              style={{
                display: "flex",
                width: "70%",
                alignContent: "center",
                flexDirection: "column",
                justifyItems: "center",
                gap: "20px",
              }}
            >
              <ListPost listItems={posts} />
            </div>
          </Flex>
        </Flex>
      </Container>
    </Container>
  );
}

export default FriendProfileScreen;

const makeStyles = createStyles(() => ({
  container: {
    width: "100%",
    minWidth: 348,
    height: "100%",
    background: "lightgrey",
    padding: "0px",
    [`@media (max-width:575px)`]: {
      height: "calc(100vh - 67px)",
    },
  },
  subContainer: {
    marginTop: "15%",
    borderRadius: "9px",
    opacity: 0.9,
    position: "relative",
    width: "70%",
    background: "white",
    display: "flex",
    gap: "12px",
    flexDirection: "column",
    minWidth: 348,
    height: "100%",
    padding: "16px",
    [`@media (max-width:575px)`]: {
      height: "calc(100vh - 67px)",
    },
  },
  flexRow: {
    gap: "8px",
  },
  header: {
    width: "100%",
    justifyContent: "space-between",
  },
  avatar: {
    width: 150,
    height: 150,
    [`@media (max-width:575px)`]: {
      width: 120,
      height: 120,
    },
  },
  avatarWrapper: {
    position: "relative",
    width: 166,
    height: 166,
    borderRadius: "50%",
    background: "linear-gradient(90deg, #E46125 0%, #C91A44 100%)",
    "::before": {
      content: '""',
      position: "absolute",
      width: 158,
      height: 158,
      borderRadius: "50%",
      background: "#FFFFFF",
    },

    [`@media (max-width:575px)`]: {
      width: 135,
      height: 135,
      "::before": {
        width: 127,
        height: 127,
      },
    },
  },
  homeBtn: {
    [`@media (max-width:575px)`]: {
      padding: "23px !important",
    },
  },
  nickname: {
    color: "#E46125",
    fontWeight: 500,
    fontSize: 32,
    lineHeight: "40px",
  },
  editBtn: {
    marginTop: 8,
    padding: 0,
    width: "133px !important",
    height: "28px !important",
    background: "#EAEAEA",
    color: "#929292",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "20px",
    borderRadius: 53,
    ":hover": {
      background: "#EAEAEA",
    },
    [`@media (max-width:575px)`]: {
      fontSize: 16,
    },
  },
}));
