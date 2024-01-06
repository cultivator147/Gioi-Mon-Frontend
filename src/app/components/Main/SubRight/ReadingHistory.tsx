import React, { useState } from "react";
import styled from "styled-components";
import { SampleStoryProps } from "../ListStoriesHome/StoryHome";
import { HistoryStory } from "./HistoryStory";
import { getReadingHistory } from "../../../../api/modules/stories/stories";

export const ReadingHistory = () => {
  const [stories, setStories] = useState([]);
  React.useEffect(() => {
    const getAll = async() => {
        const response = await getReadingHistory();
        setStories(response?.data?.data);
    };
    getAll();
  },[])
  return (
    <Wrapper>
      {stories.map((story: SampleStoryProps) => (
        <HistoryStory 
        title={story.title}
        picture={story.picture}
        link={story.link}
        chapters={story?.chapters}
        />
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
