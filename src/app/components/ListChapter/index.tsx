import styled from "styled-components";
import { StyledLink } from "../Common/StyledLink";
import { Logger } from "../../../utils/helper";

export interface ChapterProps{
    chapterNumber : number,
    href : string,
    chapterName ?: string,
}

export const Chapter = (props: ChapterProps) => {
    const chapterName = props.chapterName === undefined ? '' : `: ${props.chapterName}`;
    const title = `Chapter ${props.chapterNumber}${chapterName}`;
    return(
        <StyledLink 
        title= {title}
        color="#000000" 
        href={props.href}/>
    );
   
};

export interface ListChapterProps {
    listChapterProps : ChapterProps[],
    chapterQuantity : number
}
export const ListChapter = (props : ListChapterProps) => {
    const listChapterProps : ChapterProps[] = props.listChapterProps;
    // Logger("List Chapter Props: ", listChapterProps);
    return (
        <Wrapper>
            {listChapterProps.map(
                (chapter: ChapterProps) => (
                    <Chapter chapterName={chapter.chapterName} chapterNumber={chapter.chapterNumber} href={chapter.href}/>
                )
            )}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: start;
`;
