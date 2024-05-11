import styled from "styled-components";
import { StyledLink } from "../Common/StyledLink";
import { Logger } from "../../../utils/helper";
import { StyleConstants } from "../../../styles/StyleConstants";

export interface ChapterProps{
    chapterNumber : any,
    picture : string,
    chapterName ?: string,
    lastUpdate ?: any ,
    chapters?: ChapterProps
}

export const Chapter = (props: ChapterProps) => {
    const chapterName = props.chapterName === undefined || props.chapterName === null ? '' : `: ${props.chapterName}`;
    const title = `Chapter ${props.chapterNumber}${chapterName}`;
    return(
        <StyledLink 
        fontSize={StyleConstants.FONT_SIZE_SMALL}
        title= {title}
        color="#000000" 
        href={props.picture}/>
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
                    <Chapter chapterName={chapter.chapterName} chapterNumber={chapter.chapterNumber} picture={chapter.picture}/>
                )
            )}
        </Wrapper>
    );
}
const Wrapper = styled.div`
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: start;
`;
