import styled from "styled-components";
import { StyledImage } from "../../Common/Image";
import { StyledLabel } from "../../Common/StyledLabel";
import { t } from "i18next";
import { title } from "process";
import { StyledLink } from "../../Common/StyledLink";
import { Chapter, ChapterProps, ListChapter } from "../../ListChapter";
import { Logger } from "../../../../utils/helper";
import { StyleConstants } from "../../../../styles/StyleConstants";
import { NavLink } from "react-router-dom";
import { BackgroundImage, Container, Flex } from "@mantine/core";
export interface SimpleStoryProps {
  id?: any;
  title: string;
  picture: string;
  link: string;
  chapters: ChapterProps[];
}
export const SampleStory = (props: SimpleStoryProps) => {
  const newestChapters: ChapterProps[] = props.chapters || [];
  return (
    <StoryWrapper>
        
      <NavLink to={props.link}>
        <Flex sx={{width: '170px', height: '200px', borderStyle: 'solid', borderRadius: '9px', borderColor: 'white'}}>
          <StyledImage
            src={props.picture}
            onClick={() => {
              console.log("Cliked Story!");
            }}
          />
        </Flex>

      </NavLink>
      <div style={{ maxWidth: "150px" }}>
        <StyledLink
          fontSize={StyleConstants.FONT_SIZE_LOWER_MEDIUM}
          color="#000000"
          underline={false}
          href={props.link}
          title={props.title}
          customStyle={{}}
        />
      </div>

      <ListChapter
        chapterQuantity={newestChapters.length}
        listChapterProps={newestChapters}
      />
    </StoryWrapper>
  );
};
const StoryWrapper = styled.div`
  max-width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
`;
