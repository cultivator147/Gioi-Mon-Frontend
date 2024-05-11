import styled from "styled-components";
import { PageWrapper, SubWrapperRow } from "../PageWrapper";
import { StyledImage } from "../Common/Image";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import useStoryContent from "../../../hooks/useStoryContent";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledLink } from "../Common/StyledLink";
import { Brand } from "../Header/Brand";
import { StyledNavButton } from "../Common/Button/StyledNavButton";
import { postRequestStory } from "../../../api/modules/stories/request copy";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { ChapterProps } from "../ListChapter";
export const StoryContent = () => {
  const chapterNumber = useParams().chapternumber || "1";
  const storyId = useParams().storyid || "1";
  const [images, setImages] = useState<string[]>([]);
  const [chapters, setChapters] = useState<ChapterProps[]>([]);
  const [title, setTitle] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [chapterQuantity, setChapterQuantity] = useState(1);
  const userId = useSelector(getUserSelector)?.id;
  const [showChapterDropdown, setShowChapterDropdown] = useState(false);
  const navigate = useNavigate();
  const onClick = () => {
    setShowChapterDropdown(!showChapterDropdown);
  };
  const handlePreviousChapter = () => {
    navigate(`/truyen-tranh/${storyId}/${+chapterNumber - 1}`);
    window.location.reload();
  };
  const handleNextChapter = () => {
    navigate(`/truyen-tranh/${storyId}/${+chapterNumber + 1}`);
    window.location.reload();
  };
  const onCompleteGetContent = (data: any) => {
    const { images, title, chapterName, chapterQuantity, chapters } = data;
    setTitle(title);
    setImages(images);
    setChapterName(chapterName);
    setChapterQuantity(chapterQuantity);
    setChapters(chapters);
  };
  const { getStoryContent } = useStoryContent({
    onComplete: onCompleteGetContent,
    storyId: parseInt(storyId),
    chapterId: parseInt(chapterNumber),
  });
  React.useEffect(() => {
    const readingHistory = async () => {
      await postRequestStory(
        "/story/history",
        { story_id: storyId, chapter_number: chapterNumber },
        { user_id: userId, Authorization: "token" }
      );
    };

    readingHistory();
  }, []);

  useEffect(() => {
    getStoryContent();
  }, [storyId, chapterNumber]);
  return (
    <Wrapper>
      <HeaderContent>
        <First>
          <Brand />
        </First>
        <Second>
          <div style={{ display: "flex" }}>
            <StyledLink
              href={`/truyen-tranh/${storyId}`}
              title={`${title}   >`}
              fontSize={"1.2em"}
              color="#ffffff"
            />
            <StyledLabel
              title={`EP. ${chapterNumber}`}
              fontSize={"1.2em"}
              color="#ffffff"
            />
          </div>
        </Second>
        <Third>
          <div style={{ display: "flex" }}>
            <StyledNavButton
              href={`/truyen-tranh/${storyId}/${+chapterNumber - 1}`}
              backgroundColor="#ffffff"
              label={"Chương trước"}
              customStyle={{ fontColor: "#ffffff" }}
              onClick={handlePreviousChapter}
              disable={chapterNumber == "1"}
            />
            {/* <StyledLink title={"Chương trước"} fontSize={"1em"} onClick={handlePreviousChapter}/> */}
            <button
            className=""
             onClick={onClick}>
            {`#${chapterNumber}`}
            </button>
            <StyledNavButton
              backgroundColor="#ffffff"
              label={"Chương sau"}
              customStyle={{ fontColor: "#ffffff" }}
              href={`/truyen-tranh/${storyId}/${+chapterNumber + 1}`}
              onClick={handleNextChapter}
              disable={+chapterNumber == chapterQuantity}
            />
           {showChapterDropdown && <ListChapterDropDown>
              <ListChapterGrid>
                {chapters?.map((chapter) => (
                    <LIChapter
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={() => {navigate(`/truyen-tranh/${storyId}/${chapter.chapterNumber}`); window.location.reload();}}
                  >
                    <StyledLink
                      href={`/truyen-tranh/${storyId}/${chapter.chapterNumber}`}
                      title={`Chương ${chapter.chapterNumber}`}
                      color="black"
                      fontSize={"1.1em"}
                    />
                    <StyledLink
                      // title={`${chapter?.lastUpdate}`}
                      title={`Mới cập nhật`}
                      color="gray"
                      fontSize={"1.1em"}
                    />
                  </LIChapter>
                )
              )}
              </ListChapterGrid>
            </ListChapterDropDown>}
            {/* <StyledLink onClick={handleNextChapter}  title={"Chương sau"} fontSize={"1em"} /> */}
          </div>
         
        </Third>
        <div style={{ flex: "0.5" }}></div>
      </HeaderContent>
     
      <ListChapters>
        {images.map((image, index) => (
          <div key={`${image}-${index}`}>
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
    justify-content: start;
  }
`;
const First = styled.div`
  align-items: center;
`;
const Second = styled.div`
  padding: 8px;
  margin-left: 12px;
  display: flex;
  align-items: center;
`;
const Third = styled.div`
  flex: 1;
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 15em;
`;
export const ListChapterDropDown = styled.div`
  overflow-y: scroll;
  background-color: #FFFFFF;
  float: left;
  min-width: 15rem;
  min-height: 5em;
  max-height: 25em;
  position: absolute;
  top: 100%;
  z-index: 1005;
  list-style: none;
  cursor: default;
  border-style: solid;
  border-color: rgb(190 140 40);
  border-width: 2px;
`;

export const ListChapterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
`;

export const LIChapter = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 4px;
  cursor: pointer;
  :hover {
    background-color: #e5e7eb;
  }
`;