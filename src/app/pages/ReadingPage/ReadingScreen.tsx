import { Container, Flex, Title, Text, Stack, Image } from "@mantine/core";
import styled from "styled-components";
import {
  PageWrapper,
  SubWrapperRow,
  SubWrapperColumn,
} from "../../components/PageWrapper";
import { MantineImage } from "../../components/Common/Image/StyledAvatar";
import { useState } from "react";
import React from "react";
import { getReadingStories } from "../../../api/modules/stories/listStories";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { convertTimeToFacebookStyle } from "../../../utils/helper";
import { useNavigate } from "react-router-dom";
interface ReadingStory {
  userId?: any;
  storyId: any;
  time?: any;
  chapterNumber: any;
  title: any;
  picture: any;
  link: any;
}
export const ReadingScreen = () => {
  const [stories, setStories] = useState<ReadingStory[]>([]);
  const user = useSelector(getUserSelector);
  React.useEffect(() => {
    const fetchHistory = async () => {
      const response = await getReadingStories(user.token, {
        page: 0,
        size: 10,
      });
      setStories(response?.data?.data?.content);
    };
    fetchHistory();
  }, []);
  return (
    <Wrapper>
      <Flex
        bg={"#ece7e7"}
        justify={"center"}
        sx={{ width: "100%", padding: "12px" }}
      >
        <Stack
          bg={"#ffffff"}
          align="center"
          sx={{ width: "60%", borderRadius: 10, padding: "8px" }}
        >
          <Flex
            align={""}
            justify={"center"}
            sx={{ height: "10vh", width: "100%" }}
          >
            <Title
              variant="gradient"
              gradient={{ from: "indigo", to: "cyan", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif" }}
              ta="center"
              fw={700}
              order={1}
              fs={"italic"}
            >
              Lịch sử đọc truyện
            </Title>
          </Flex>
          <Stack align={""} justify={"center"} sx={{ width: "100%" }}>
            {stories.map((story) => (
              <ReadingStory
                storyId={story.storyId}
                chapterNumber={story.chapterNumber}
                userId={story?.userId}
                time={story?.time}
                title={story.title}
                picture={story.picture}
                link={story.link}
              />
            ))}
          </Stack>
        </Stack>
      </Flex>
    </Wrapper>
  );
};
const ReadingStory = (props: ReadingStory) => {
  const navigate = useNavigate();
  const [bg, setBg] = useState("#EAE3E3");
  return (
    <Flex
      onMouseEnter={() => setBg("#DFC6C6")}
      onMouseLeave={() => setBg("#EAE3E3")}
      // onClick={() => {navigate(`/truyen-tranh/${props.storyId}/${props.chapterNumber}`)}}
      bg={bg}
      sx={{ height: "20vh", width: "100%", borderRadius: 10 }}
    >
      <Flex sx={{ height: "inherit", width: "25%" }}>
        <MantineImage
          width={"100%"}
          height={"100%"}
          src={props.picture}
          onClick={() => {
            navigate(`/truyen-tranh/${props.storyId}`);
          }}
          alt={props.title}
        />
      </Flex>
      <Stack justify="center" sx={{ width: "70%", height: "100%" }}>
        <Flex justify={"center"} sx={{ width: "100%" }}>
          <Title
            order={1}
            variant="gradient"
            gradient={{ from: "#AD8F8F", to: "#558D59", deg: 45 }}
            sx={{ fontFamily: "Greycliff CF, sans-serif", cursor: "pointer" }}
            onClick={() => {
              navigate(`/truyen-tranh/${props.storyId}`);
            }}
            ta="center"
            fw={700}
            // fs={"italic"}
          >
            {props.title}
          </Title>
        </Flex>
        <Flex>
          <Stack sx={{ padding: "9px", width: "60%" }}>
            <Flex>
              <Text
                variant="gradient"
                gradient={{ from: "#AD8F8F", to: "#558D59", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                fw={700}
                // fs={"italic"}
                fz={"xl"}
              >
                Tác giả:
              </Text>
            </Flex>
            <Flex>
              <Text
                variant="gradient"
                gradient={{ from: "#AD8F8F", to: "#558D59", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                fw={700}
                // fs={"italic"}
                fz={"xl"}
              >
                Lần cuối đọc: {convertTimeToFacebookStyle(props.time)}
              </Text>
            </Flex>
          </Stack>
          <Flex align={"center"} justify={"center"} sx={{ height: "100%" }}>
            <Text
              variant="gradient"
              gradient={{ from: "#b14d25", to: "#61a2df", deg: 45 }}
              sx={{ fontFamily: "Greycliff CF, sans-serif", cursor: "pointer" }}
              fw={700}
              fs={"italic"}
              fz={"xl"}
              onClick={() => {
                navigate(
                  `/truyen-tranh/${props.storyId}/${props.chapterNumber}`
                );
              }}
            >
              Đọc tiếp chap {props.chapterNumber}
            </Text>
          </Flex>
        </Flex>
      </Stack>
    </Flex>
  );
};
const Wrapper = styled(PageWrapper)`
  padding: 12px;
  justify-content: center;
  flex: 1;
  min-height: 75vh;

  ${SubWrapperRow} {
    height: 100%;
    width: 100%;
    flex: 1;
    justify-content: start;
    align-items: start;
  }
  ${SubWrapperColumn} {
    max-width: 1080px;
    background-color: #ece7e7;
    justify-content: start;
    align-items: start;
  }
`;
