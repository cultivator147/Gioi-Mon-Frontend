import styled from "styled-components";
import { StyledLabel } from "../../../Common/StyledLabel";
import { useState } from "react";
import { getTopStories } from "../../../../../api/modules/stories/listStories";
import React from "react";
import { LeaderboardStory } from "./LeaderboardStory";
import { SimpleStoryProps } from "../../ListStoriesHome/StoryHome";
import { StyledLink } from "../../../Common/StyledLink";

export const Leaderboard = () => {
  const [stories, setStories] = useState([]);
  const getAll = async (orderBy: string) => {
    const response = await getTopStories({ type: orderBy });
    const histories: Array<any> = response?.data?.data;
    if (histories.length <= 7) {
      setStories(response?.data?.data);
    } else {
      setStories(response?.data?.data.slice(0, 7));
    }
  };
  React.useEffect(() => {
    getAll("TOP_MONTHLY");
  }, []);
  const getTopMonthly = () => {
    getAll("TOP_MONTHLY");
  };
  const getTopWeekly = () => {
    getAll("TOP_WEEKLY");
  };
  const getTopDaily = () => {
    getAll("TOP_DAILY");
  };
  return (
    <Wrapper>
      <div style={{ display: "flex", flex: 1 }}>
        <Box onClick={getTopMonthly}>
          <StyledLink title="Top Tháng" color="black" fontSize={"16px"}  />
        </Box>
        <Box onClick={getTopWeekly}>
          <StyledLink title="Top Tuần" color="black" fontSize={"16px"} />
        </Box>
        <Box onClick={getTopDaily}>
          <StyledLink title="Top Ngày" color="black" fontSize={"16px"} />
        </Box>
      </div>
      <div>
        {stories.map((story: SimpleStoryProps) => (
          <LeaderboardStory
            id={story.id}
            title={story.title}
            picture={story.picture}
            link={story.link}
            chapters={story?.chapters}
          />
        ))}
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
`;
const Box = styled.a`
  background-color: #b7d9ae;
  padding: 12px;
  width: 33%;
  text-align: center;
  cursor: pointer;
  &:hover {
    background-color: white;
  }
`;
