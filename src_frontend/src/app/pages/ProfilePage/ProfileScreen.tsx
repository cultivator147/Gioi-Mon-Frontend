import {
  Avatar,
  BackgroundImage,
  Button,
  Center,
  Container,
  createStyles,
  FileInput,
  Flex,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Notification
} from "@mantine/core";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { getUserCoin } from "../../../api/modules/user/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { UserSlice } from "../../../redux-toolkit/slice/userSlice";
import { uploadImage } from "../../../utils/imageUploader";
import { IconCheck } from "@tabler/icons-react";
import { delay } from "../../../utils/helper";
function ProfileScreen() {
  const navigate = useNavigate();
  const { profile } = useSelector(getUserSelector);
  const user = useSelector(getUserSelector);
  // Local
  const { t } = useTranslation();
  const { classes } = makeStyles();
  const isMobile = false;
  const [posts, setPosts] = useState([]);
  const [coin, setCoin] = useState();
  const [nickname, setNickname] = useState<string>(profile.nickname);
  const [img, setImg] = useState(profile.avatar);
  const dispatch = useDispatch();
  const { actions } = UserSlice();
  const [loading, setLoading] = useState(false);
  const [bgImg, setBgImg] = useState(
    "https://wallpapersmug.com/large/fc8c6a/beautiful-girl-anime-art-original-22.jpg"
  );

  const [progressLevel, setProgressLevel] = useState();
  const handleLevelChange = (newLevel: any) => {
    setProgressLevel(newLevel);
  };
  React.useEffect(() => {
    const getPost = async () => {
      try {
        const params: TypeListPost = { page: 0, size: 7, friend_id: user.id };
        const response = await getListPost(user.token, params);
        const data = response?.data?.data;
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    const fetchUserCoin = async () => {
      try {
        const response = await getUserCoin(user.token);
        const { coin } = response?.data?.data;
        setCoin(coin);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserCoin();
    getPost();
  }, []);
  const handleBackToHome = () => {
    navigate("/");
  };
  const handleEditProfile = async () => {
    setLoading(true);
    dispatch(
      actions.updateProfile({
        id: user.id,
        token: user.token,
        navigate: '/user/profile',
        profile: {
          nickname: nickname,
          avatar: img,
          date_of_birth: profile.date_of_birth,
          zodiac: profile.zodiac,
          gender: profile.gender,
          introduction: profile.introduction,
          relationship: profile.relationship,
        },
      })
    );
    await delay(3000);
    setLoading(false);
    
  };
  const handleUploadImage = async (e: any) => {
    setLoading(true);
    if (!e.target.files) return;
    const uri: string = await uploadImage(e.target.files[0]);
    if (uri) {
      setImg(uri);
    } else {
      console.log("no file uploaded...");
    }
    setLoading(false);
  };
  return (
    <Container fluid className={classes.container}>
      <BackgroundImage
        sx={{
          position: "absolute",
          minHeight: "324px",
          maxHeight: "394px",
          aspectRatio: "7/2",
          zIndex: 0,
        }}
        src={bgImg}
      ></BackgroundImage>
      <Container fluid className={classes.subContainer}>
      <LoadingOverlay   loaderProps={{ size: 'xl'}} visible={loading} overlayBlur={2}/>
        <Flex className={classes.header}>
          <SubtleButton
            className={classes.homeBtn}
            variant="subtle"
            onClick={handleBackToHome}
          >
            {!isMobile && <Home />}
          </SubtleButton>

          <Flex align="center" direction={"column"}>
            <label htmlFor={"avt_file2"} style={{  }}>
              <Center className={classes.avatarWrapper}>
                <Avatar className={classes.avatar} radius={99} src={img} />
                <input
                  id={"avt_file2"}
                  type="file"
                  accept="image/*"
                  draggable={true}
                  capture
                  hidden={true}
                  onChange={handleUploadImage}
                />
              </Center>
            </label>

            <Text className={classes.nickname}>{`${profile.nickname}, ${Age(
              profile?.date_of_birth
            )}`}
            </Text>
          </Flex>

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
          sx={{
            justifyItems: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Flex
            justify={"center"}
            align={"center"}
            sx={{
              flexDirection: "row",
              gap: "16px",
              width: "100%",
            }}
          >
            <StyledLabel title={"Xu: "} color="black" />
            <StyledLabel title={`${coin}`} color="black" />
            <FontAwesomeIcon icon={faCoins} color="red" />
          </Flex>
          {/* <Flex
            sx={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "60%",
              gap: "8px",
            }}
          >
            <Flex gap={"6px"}>
              <StyledLabel title={"Level"} color="black" />
              <StyledLabel title={profile?.level || 1} color="black" />
            </Flex>
            TODO : Process bar here
            <div className="progress-bar-container">
              <div
                className={`progress-bar`}
                style={{ width: `${progressLevel * 50}%` }}
              ></div>
            </div>
            <Flex gap={"6px"}>
              <StyledLabel title={"Level"} color="black" />
              <StyledLabel title={profile?.level || 2} color="black" />
            </Flex>
          </Flex> */}
        </Flex>
        <Flex direction={"column"} gap={"16px"}>
          <Text
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif" }}
            ta="start"
            style={{ marginLeft: "64px" }}
            fz="xl"
            fw={700}
          >
            {"Thông tin cá nhân:"}
          </Text>
          <Flex direction={"column"} gap={"12px"} sx={{ width: "90%" }}>
              <Flex className={classes.flexRow}>
                <Text
                  style={{ marginLeft: "76px" }}
                  variant="gradient"
                  gradient={{ from: "indigo", to: "cyan", deg: 45 }}
                  sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                  ta="center"
                  fz="xl"
                  fw={700}
                >
                  {"Nickname:"}
                </Text>
                <TextInput
                  onChange={(e) => {
                    setNickname(e.currentTarget.value);
                  }}
                  value={nickname}
                  style={{ width: "100%" }}
                  placeholder="Điền nickname của bạn"
                />
              </Flex>
          </Flex>
          <Flex justify={"center"}>
            <Button
              variant="gradient"
              size="sm"
              gradient={{ from: "teal", to: "lime", deg: 105 }}
              onClick={handleEditProfile}
            >
              Lưu thông tin
            </Button>
          </Flex>
          {/* TODO: Chọn danh hiệu */}
          <Flex
            direction={"column"}
            gap={"16px"}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            <div style={{ display: "flex" }}>
              <Text
                variant="gradient"
                gradient={{ from: "red", to: "cyan", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
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

export default ProfileScreen;

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
    cursor: 'pointer',
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
