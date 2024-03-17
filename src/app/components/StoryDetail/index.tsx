import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import { MainStory } from "./MainStory";
import React, { useState } from "react";
import { StyleConstants } from "../../../styles/StyleConstants";
import { PageWrapper } from "../PageWrapper";
import { StyledButton } from "../Common/StyledButton";
import { ChapterProps } from "../ListChapter";
import { StyledLink } from "../Common/StyledLink";
import { StyledLabel } from "../Common/StyledLabel";
import { Author } from "../../../api/interfaces/author";
import useDetailStory from "../../../hooks/useDetailStory";
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
  };
  const { getDataDetailStory } = useDetailStory({
    onComplete: onCompleteGetDetailStory,
    storyId: storyId,
  });
  React.useEffect(() => {
    getDataDetailStory();
  }, []);

  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          width: "60%",
          backgroundColor: "white",
          gap: "8px",
        }}
      >
        <div style={{ width: "70%", display: "flex", flexDirection: "column" }}>
          <div style={{ width: "100%" }}>
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
            <div
              style={{
                width: "60%",
                display: "flex",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <StyledButton
                    href={`/truyen-tranh/${storyId}/${chapters[0]?.chapterNumber}`}
                    label="Đọc từ đầu"
                    backgroundColor="orange"
                    customStyle={{ padding: "8px" }}
                  />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <StyledButton
                  href={`/truyen-tranh/${storyId}/${
                    chapters[chapters.length - 1]?.chapterNumber
                  }`}
                    label="Đọc mới nhất"
                    backgroundColor="orange"
                    customStyle={{ padding: "8px" }}
                  />
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                  <StyledButton
                  href={`/truyen-tranh/${storyId}/1`}
                    label="Đọc tiếp"
                    backgroundColor="red"
                    customStyle={{ padding: "8px" }}
                  />
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <StyledLabel title="Số chương" color="black" />
                <StyledLabel title="Cập nhật" color="black" />
              </div>
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  padding: "8px",
                }}
              >
                {chapters.map((chapter: ChapterProps) => (
                  <li
                    style={{ display: "flex", justifyContent: "space-between" }}
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
                  </li>
                ))}
              </div>
            </ListChapters>
          </div>
        </div>
        <div style={{ width: "30%" }}>
          <SubRight />
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 24px;
`;
const Wrapper = styled(PageWrapper)`
  flex: 1;
  width: 100%;
  justify-content: center;
  background-color: ${StyleConstants.BACKGROUND_MAIN_COLOR};
  min-height: 500px;
`;
