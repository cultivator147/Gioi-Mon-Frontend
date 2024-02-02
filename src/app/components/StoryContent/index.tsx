import styled from "styled-components";
import { PageWrapper, SubWrapperRow, SubWrapperColumn } from "../PageWrapper";
import { StyledImage } from "../Common/Image";
import { useParams } from "react-router-dom";
import { useState } from "react";
import React from "react";
import useStoryContent from "../../../hooks/useStoryContent";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledLink } from "../Common/StyledLink";
import { Brand } from "../Header/Brand";
// import { useAppSelector } from "../../../redux-toolkit/hooks";

export const StoryContent = () => {
  const chapterNumber = useParams().chapternumber || "1";
  const storyId = useParams().storyid || "1";

  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [chapterName, setChapterName] = useState("");

  // const story = useAppSelector((state) => state.story);

  const onClick = () => {
    // console.log(story.chapters);
  }
  const onCompleteGetContent = (data: any) => {
    const { images, title, chapterName } = data;
    setTitle(title);
    setImages(images);
    setChapterName(chapterName);
  };
  const { getStoryContent } = useStoryContent({
    onComplete: onCompleteGetContent,
    storyId: parseInt(storyId),
    chapterId: parseInt(chapterNumber),
  });
  React.useEffect(() => {
    getStoryContent();
  }, []);
  return (
    <Wrapper>
      <HeaderContent>
        <First>
          <Brand />
        </First>
        <Second>
          <StyledLabel
            title={`${title}   >`}
            fontSize={"1.2em"}
            color="#ffffff"
          />
          <StyledLabel
            title={`EP. ${chapterNumber}${chapterName}`}
            fontSize={"1.2em"}
            color="#ffffff"
          />
        </Second>
        <Third>
          <StyledLink title={"Chương trước"} fontSize={"1em"} href="/" />
          <button onClick={onClick}>
          <StyledLink title={`#${chapterNumber}`} fontSize={"1em"}/>

          </button>
          <StyledLink title={"Chương sau"} fontSize={"1em"} />
        </Third>
      </HeaderContent>
      <ListChapters>
        {images.map((image) => (
          <div>
            <StyledImage src={image} width={700} height={500} />
          </div>
        ))}
      </ListChapters>
    </Wrapper>
  );
};
const ListChapters = styled.ul`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 2;
  list-style: none;
  height: 100%;
  margin-block-start: 4em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const Wrapper = styled(PageWrapper)`
  flex: 1;
  width: 100%;
  justify-content: center;
  background-color: #ffffff;
`;

const HeaderContent = styled(PageWrapper)`
  background-color: ${StyleConstants.BACKGROUND_HEADER_CONTENT_COLOR};
  z-index: 3;
  width: 100%;
  min-height: 3em;
  position: fixed;
  ${SubWrapperRow} {
    padding: 4px 8px;
    justify-content: space-between;
  }
`;
const First = styled.div`
  width: auto;
`;
const Second = styled.div`
  padding: 8px;
  margin-left: 12px;
  display: flex;
  align-items: center;
`;
const Third = styled.div`
  padding: 8px;
  margin-left: 36px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 15em;
`;
const Fourth = styled.div`
  padding: 8px;
  margin-left: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  min-width: 15em;
`;
