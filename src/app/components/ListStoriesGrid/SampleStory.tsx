import styled from "styled-components";
import { Image } from "../Image"
import { StyledLabel } from "../Common/StyledLabel";
import { t } from "i18next";
import { title } from "process";
import { StyledLink } from "../Common/StyledLink";
import { Chapter, ChapterProps, ListChapter } from "../ListChapter";
import { Logger } from "../../../utils/helper";
export interface SampleStoryProps{
    image : string,
    title: string,
    href: string,
    newestChapters: ChapterProps[]
}
export const SampleStory = (props: SampleStoryProps) =>{
    const newestChapters : ChapterProps[] = props.newestChapters || [];
    // Logger("Newest Chapters: ", newestChapters);
    return(
        <StoryWrapper>
            <a href = {props.href}>
                <Image
                    src={props.image}
                    width={150}
                    height={190}
                    onClick={() => {console.log("Cliked Story!")}}
                />
            </a>
            <StyledLink 
            color="#000000" 
            underline = {false} 
            href = {props.href} 
            title={props.title} />
            <ListChapter chapterQuantity={newestChapters.length} listChapterProps={newestChapters}/>
        </StoryWrapper>

    );
};
const StoryWrapper = styled.div`
    margin-top: 8px;
`;
