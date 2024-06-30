import React, { useState } from "react";
import styled from "styled-components";
import { SimpleStoryProps } from "../../ListStoriesHome/StoryHome";
import { HistoryStory } from "./HistoryStory";
import { getReadingHistory, getReadingStories } from "../../../../../api/modules/stories/listStories";
import { StyledLabel } from "../../../Common/StyledLabel";
import { StyledLink } from "../../../Common/StyledLink";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../../../redux-toolkit/slice/userSlice/selector";
export const ReadingHistory = () => {
  const user = useSelector(getUserSelector);
  const [stories, setStories] = useState([]);
  React.useEffect(() => {
    const getAll = async() => {
        const response = await getReadingStories(user.token, {
          page: 0,
          size: 10,
        });
        const histories: Array<any> = response?.data?.data?.content;
          if(histories.length <= 3){
            setStories(response?.data?.data?.content);
          }else{
            setStories(response?.data?.data?.content.slice(0,3));
          }
    };
    getAll();
  },[]);
  return (
    <Wrapper>
      <div style={{display: "flex", justifyContent: "space-between", paddingBottom: "16px"}}>
        <StyledLabel 
        fontSize="20px"
        color="#6AB5CE"
        title="Lịch sử đọc truyện"
        />
        <StyledLink 
        italic ={true}
        fontSize="16px"
        color="black"
        title="Xem tất cả"
        />
      </div>
      {stories.map((story: any) => (
        <HistoryStory 
        chapterNumber={story.chapterNumber}
        id={story.storyId}
        title={story.title}
        picture={story.picture}
        link={story.link}
        />
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-width: 1px;
  border-style: solid;
  border-color: grey;
`;
