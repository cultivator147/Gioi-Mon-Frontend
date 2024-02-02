import { useParams } from "react-router-dom";
import styled from "styled-components";
import { MainStory } from "./MainStory";
import { getDetailStory } from "../../../api/modules/stories/stories";
import React, { useState } from "react";
import { StyleConstants } from "../../../styles/StyleConstants";
import { PageWrapper, SubWrapperRow, SubWrapperColumn } from "../PageWrapper";
import { Logger } from "../../../utils/helper";
import { StyledButton } from "../Common/StyledButton";
import { ChapterProps } from "../ListChapter";
import { StyledLink } from "../Common/StyledLink";
import { StyledLabel } from "../Common/StyledLabel";
import { Author } from "../../../api/interfaces/author";
import useDetailStory from "../../../hooks/useDetailStory";
// import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { addStory, storySlice, updateStory } from "../../../redux-toolkit/slice/storySlice/storySlice";
import { ReadingHistory } from "../Main/SubRight/ReadingHistory/ReadingHistory";
import { Leaderboard } from "../Main/SubRight/Leaderboard/Leaderboard";
import { SubRight } from "../Main/SubRight";

export const Story = () => {
  const storyId = useParams().storyid;
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [picture, setPicture] = useState("");
  const [chapters, setChapters] = useState<ChapterProps[]>([]);
  const [categories, setCategories] = useState([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  const [status, setStatus] = useState("");
  const [views, setViews] = useState(0);
  const [introduction, setIntroduction] = useState("");

  // const dispatch = useAppDispatch();
  const onCompleteGetDetailStory = (data: any) => {
    const {
      title,
      link,
      picture,
      chapters,
      categories,
      authors,
      writingState,
      views,
    } = data;
    setAuthors(authors);
    setTitle(title);
    setLink(link);
    setPicture(picture);
    setChapters(chapters);
    setCategories(categories);
    setStatus(writingState);
    setViews(views);

  }
  const {getDataDetailStory} = useDetailStory({onComplete: onCompleteGetDetailStory, storyId: storyId});
  React.useEffect(() => {
    getDataDetailStory();
  }, []);
  console.log("chapters: ", chapters);
  
 
  return (
    <Wrapper>
      <div style={{ display: "flex", width: "60%", backgroundColor: 'white' }}>
        <div style={{ width: "70%", display: "flex", flexDirection: "column", }}>
          <div style={{ width: "100%"}}>
            <MainStory
              authors={authors}
              title={title}
              picture={picture}
              // link={link}
              // chapters={chapters}
              categories={categories}
              // introduction={introduction}
              status={status}
              views={views}
            />
          </div>
          <DivButton>
            <div style={{width: '60%', display: 'flex', justifyContent: 'center', gap: '12px'}}>

            <div style={{  display: "flex", justifyContent:"center" }}>
              <a
                href={`/truyen-tranh/${storyId}/${chapters[0]?.chapterNumber}`}
                style={{ cursor: "pointer" }}
              >
                <StyledButton
                  label="Đọc từ đầu"
                  backgroundColor="orange"
                  customStyle={{ padding: "8px" }}
                />
              </a>
            </div>
            <div style={{  display: "flex", justifyContent:"center" }}>
              <a
                href={`/truyen-tranh/${storyId}/${
                  chapters[chapters.length - 1]?.chapterNumber
                }`}
                style={{ cursor: "pointer" }}
              >
                <StyledButton
                  label="Đọc mới nhất"
                  backgroundColor="orange"
                  customStyle={{ padding: "8px" }}
                />
              </a>
            </div>
            <div style={{display: "flex", justifyContent:"center" }}>
              <a
                href={`/truyen-tranh/${storyId}/1`}
                style={{ cursor: "pointer" }}
              >
                <StyledButton
                  label="Đọc tiếp"
                  backgroundColor="red"
                  customStyle={{ padding: "8px" }}
                />
              </a>
            </div>
            </div>

          </DivButton>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              flex: 1,
            }}
          >
            <StyledLabel
              title="Danh sách chương"
              fontSize={"24px"}
              color="blue"
            />
            <ListChapters>
              <StyledLabel title="Số chương" color="black" />
              <ul style={{}}>
                {chapters.map((chapter: ChapterProps) => (
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <StyledLink
                      href={`/truyen-tranh/${storyId}/${chapter.chapterNumber}`}
                      title={`Chương ${chapter.chapterNumber}`}
                      color="black"
                    />
                    <StyledLink
                      title={`Chương ${chapter.chapterNumber}`}
                      color="gray"
                    />
                  </li>
                ))}
              </ul>
            </ListChapters>
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <SubRight/>
        </div>
      </div>
    </Wrapper>
  );
};
const ListChapters = styled.div`
  width: 100%;
  flex: 1;
`;
const DivButton = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const Wrapper = styled(PageWrapper)`
  flex: 1;
  width: 100%;
  justify-content: center;
  background-color: ${StyleConstants.BACKGROUND_MAIN_COLOR};
  min-height: 500px;
`;
