import styled from "styled-components";
import { StyledLink } from "../Common/StyledLink";
import { Logger, convertTimeToFacebookStyle } from "../../../utils/helper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Flex, Text } from "@mantine/core";

export interface ChapterProps{
    chapterNumber : any,
    picture : string,
    chapterName ?: string,
    updateDate ?: any ,
    chapters?: ChapterProps
}

export const Chapter = (props: ChapterProps) => {
    const chapterName = props.chapterName === undefined || props.chapterName === null ? '' : `: ${props.chapterName}`;
    const title = `Chapter ${props.chapterNumber}${chapterName}`;
    const {updateDate } = props;
    console.log(props);
    return(
        <Flex justify={'space-between'} sx={{width: '90%'}}>
            <StyledLink 
            fontSize={StyleConstants.FONT_SIZE_SMALL}
            title= {title}
            color="#000000" 
            href={props.picture}/>
            <Text
            fz={"sm"}
            fs={'italic'}
            >
                {convertTimeToFacebookStyle(updateDate)}
            </Text>
        </Flex>

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
                    <Chapter chapterName={chapter.chapterName} chapterNumber={chapter.chapterNumber} picture={chapter.picture} updateDate={chapter.updateDate}/>
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
