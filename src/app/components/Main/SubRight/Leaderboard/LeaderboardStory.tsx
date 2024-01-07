import styled from "styled-components"
import { StyledImage } from "../../../Common/Image";
import { StyledLink } from "../../../Common/StyledLink";
import { SampleStoryProps } from "../../ListStoriesHome/StoryHome";
import { StyledLabel } from "../../../Common/StyledLabel";

export const LeaderboardStory = (props: SampleStoryProps) => {
    const {link,title,picture} = props;
    return(
    <Wrapper>
        <a href={link}>
            <StyledImage
            src={picture}
            width={70}
            height={70}
            />
        </a>
        <div style={{display: "flex", flexDirection:"column", paddingLeft: "8px", width: "60%"}}>
            <StyledLink 
            title={title}
            href={link}
            fontSize={"16px"}
            color="black"
            />
            <StyledLink 
            fontSize={"14px"}
            color="gray"
            title={`Chương ${props?.chapters[0]?.chapterNumber}>`}
            href={props?.chapters[0]?.link}
            />
        </div>
        <div>
            <StyledLink
            italic={true}
            color="black"
            fontSize={"14px"}
            title={"Xoá"}
            />
        </div>
    </Wrapper>
    );
}
const Wrapper = styled.div`
display: flex;
flex-direction: row;
`;