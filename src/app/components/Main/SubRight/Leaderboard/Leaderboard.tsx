import styled from "styled-components";
import { StyledLabel } from "../../../Common/StyledLabel";
import { useState } from "react";
import { getTopStories } from "../../../../../api/modules/stories/stories";
import React from "react";
import { LeaderboardStory } from "./LeaderboardStory";
import { SampleStoryProps } from "../../ListStoriesHome/StoryHome";

export const Leaderboard = () =>{
    const [stories, setStories] = useState([]);
    React.useEffect(() => {
        const getAll = async() => {
            const response = await getTopStories({orderBy: "MONTH"});
            const histories: Array<any> = response?.data?.data?.content;
              if(histories.length <= 7){
                setStories(response?.data?.data?.content);
              }else{
                setStories(response?.data?.data?.content.slice(0,7));
              }
        };
        getAll();
      },[]);
    return(
        <Wrapper>
            <div style={{display:"flex",flex:1, justifyContent: "space-around"}}>
                <Box>
                    <StyledLabel
                    title="Top Tháng"
                    color="black"
                    fontSize={"16px"}
                    />
                </Box>
                <Box>
                    <StyledLabel
                    title="Top Tuần"
                    color="black"
                    fontSize={"16px"}
                    />
                </Box>
                <Box>
                    <StyledLabel
                    title="Top Ngày"
                    color="black"
                    fontSize={"16px"}
                    />
                </Box>
            </div>
            <div>
            {stories.map((story: SampleStoryProps) => (
                <LeaderboardStory 
                title={story.title}
                picture={story.picture}
                link={story.link}
                chapters={story?.chapters}
                />
      ))}
            </div>
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display:flex;
    flex:1;
    flex-direction: column;
    border-style: solid;
    border-width: 1px;
    border-color: grey;
`;
const Box = styled.a`
    padding: 8px;
    height: 40px;
    cursor: pointer;
    &:hover{
        background-color: white;
    }
`;