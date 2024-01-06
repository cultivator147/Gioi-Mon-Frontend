import styled from "styled-components"
import { StyledImage } from "../../Common/Image";
import { StyledLink } from "../../Common/StyledLink";
import { SampleStoryProps } from "../ListStoriesHome/StoryHome";
import { StyledLabel } from "../../Common/StyledLabel";

export const HistoryStory = (props: SampleStoryProps) => {
    const {link,title,picture} = props;
    return(
    <Wrapper>
        <a href={link}>
            <StyledImage
            src={picture}
            width={50}
            height={50}
            />
        </a>
        <div>
            <StyledLink 
            title={title}
            href={link}
            fontSize={16}
            color="black"
            />
            <StyledLink 
            title={`Đọc tiếp chap ${props?.chapters[0]?.chapterNumber}`}
            href={props?.chapters[0]?.link}
            />
        </div>
    </Wrapper>
    );
}
const Wrapper = styled.div`
display: flex;
flex-direction: row;

`;