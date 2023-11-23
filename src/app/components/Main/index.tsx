import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListStoriesTransition } from "../ListStoriesTranstion";
import { ListStoriesGrid } from "../ListStoriesGrid";
import { SampleStoryProps } from "../ListStoriesGrid/SampleStory";
import { ChapterProps } from "../ListChapter";
import { Logger } from "../../../utils/helper";
import React, { useState } from "react";
import axios from "axios";
async function getData(){
  
}
export const Main = () => {
  const [stories, setStories] = useState([]);
  React.useEffect(() => {
    axios.get('http://localhost:8803/v1.0/filtered-list-story?categoryId=1&writingState=2&sortBy=LAST_UPDATE_DATE&page=0&size=2').then((response) => {
        console.log(response?.data?.data?.content);
        setStories(response?.data?.data?.content);
    });
  }, []);
  // const chapters : ChapterProps[] = [
  //   {chapterNumber: 1, chapterName: "Tân thế giới", href:  "https://www.nettruyenus.com/truyen-tranh/mot-tram-le-tam-cach-bay-tro-cua-nhan-vat-phan-dien/chap-114/1070224"},
  //   {chapterNumber: 2, chapterName: "Đại suy vong", href:  "https://www.nettruyenus.com/truyen-tranh/mot-tram-le-tam-cach-bay-tro-cua-nhan-vat-phan-dien/chap-114/1070224"},
  //   {chapterNumber: 3, chapterName: "Tân đại kỷ nguyên ", href:  "https://www.nettruyenus.com/truyen-tranh/mot-tram-le-tam-cach-bay-tro-cua-nhan-vat-phan-dien/chap-114/1070224"},
  // ];
  // const stories: SampleStoryProps[] = [
  //   { image: "https://st.nettruyenus.com/data/comics/129/bocchi-the-rock.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/141/tam-trao-tien-the-chi-lu-2.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/71/tu-cao-thu-tro-thanh-phi-tan.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/89/chuong-mon-khiem-ton-chut.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/129/bocchi-the-rock.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/89/chuong-mon-khiem-ton-chut.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/205/chuyen-nang-tu-than-yeu-nhan-loai-ca-hai-1966.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/61/dai-lao-huyen-hoc-xuong-nui-khuay-dong-c-460.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/129/bocchi-the-rock.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/129/bocchi-the-rock.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  //   { image: "https://st.nettruyenus.com/data/comics/71/tu-cao-thu-tro-thanh-phi-tan.jpg", title: "Đại Y Lăng Nhiên" , href : "https://www.nettruyenus.com/truyen-tranh/dai-y-lang-nhien-364250", newestChapters : chapters}, 
  // ];

  return (
    <Wrapper>
      <SubWrapperColumn>
        <StyledLabel title="Truyện đề cử" color="#D44C4C"/>
        <ListStoriesTransition />
        <StyledLabel title="Truyện mới cập nhật" color="#D44C4C"/>
        <SubWrapperRow>
          <ListStoriesGrid listItems={stories} page={0} size={20} />
        </SubWrapperRow>
      </SubWrapperColumn>
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  background-color: ${StyleConstants.BACKGROUND_MAIN_COLOR};
  height: 100%;
  min-height: 500px;

  ${SubWrapperRow} {
    margin: 0%;
    width: 100%;
    justify-content: start;
    align-items: start;
  }
  ${SubWrapperColumn} {
    max-width: 60%;
    background-color: #ece7e7;
    justify-content: start;
    align-items: start;
  }
`;
