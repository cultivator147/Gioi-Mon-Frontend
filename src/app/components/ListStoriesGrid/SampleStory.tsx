import styled from "styled-components";
import { Image } from "../Image"
import { StyledLabel } from "../Common/StyledLabel";
import { t } from "i18next";
import { title } from "process";
import { StyledLink } from "../Common/StyledLink";
import { Chapter, ChapterProps, ListChapter } from "../ListChapter";
import { Logger } from "../../../utils/helper";
import { StyleConstants } from "../../../styles/StyleConstants";
export interface SampleStoryProps{
    picture : string,
    title: string,
    link: string,
    chapters: ChapterProps[]
}
export const SampleStory = (props: SampleStoryProps) =>{
    const newestChapters : ChapterProps[] = props.chapters || [];
    Logger("Newest Chapters: ", newestChapters);
    return(
        <StoryWrapper>
            <a href = {props.link}>
                <Image
                    src={props.picture}
                    width={150}
                    height={190}
                    onClick={() => {console.log("Cliked Story!")}}
                />
            </a>
            <StyledLink 
            fontSize={StyleConstants.FONT_SIZE_LOWER_MEDIUM}
            color="#000000" 
            underline = {false} 
            href = {props.link} 
            title={props.title} />
            <ListChapter chapterQuantity={newestChapters.length} listChapterProps={newestChapters}/>
        </StoryWrapper>

    );
};
const StoryWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 8px;
`;

