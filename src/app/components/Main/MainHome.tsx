import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListSuggestedStories } from "./ListSuggestedStories";
import { ListStoriesGrid } from "./ListStoriesHome";
import React, { useState } from "react";
import useFilteredListStories from "../../../hooks/useFilteredListStories";
import { Logger } from "../../../utils/helper";
import { SubRight } from "./SubRight";

export const MainHome = () => {
  const [stories, setStories] = useState([]);
  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data);
  }
  const {getFilteredListStories} = useFilteredListStories({onComplete: onConpleteGetFilteredListStories, categoryId: 1});
  React.useEffect(()=>{
    getFilteredListStories();
  },[]);
  return (
    <Wrapper>
      <SubWrapperColumn>
        <FirstRow>
            <StyledLabel title="Truyện nổi tiếng" color="#D44C4C"/>
            <ListSuggestedStories/>
          <StyledLabel title="Truyện mới cập nhật" color="#D44C4C"/>
        </FirstRow>
        <SecondRow>
          <SubWrapperRow>
            <First>
              <ListStoriesGrid listItems={stories} page={0} size={20} />
            </First>
            <Second>
              <SubRight/>
            </Second>
          </SubWrapperRow>
        </SecondRow>
      </SubWrapperColumn>
    </Wrapper>
  );
};
const FirstRow = styled.div`
width: 100%;
`;
const SecondRow = styled.div`
  width: 100%;
`;
const First = styled.div`
  width: 70%;
`;
const Second = styled.div`
  width: 30%;
`;
const Wrapper = styled(PageWrapper)`
  justify-content: center;
  flex: 1;
  background-color: ${StyleConstants.BACKGROUND_MAIN_COLOR};
  min-height: 500px;

  ${SubWrapperRow} {
    width: 100%;
    flex: 1;
    justify-content: start;
    align-items: start;
  }
  ${SubWrapperColumn} {
    max-width: 1080px;
    flex: 0.7;
    background-color: #ece7e7;
    justify-content: start;
    align-items: start;
  }
`;
