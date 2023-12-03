import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListStoriesTransition } from "../ListStoriesTranstion";
import { ListStoriesGrid } from "../ListStoriesGrid";
import React, { useState } from "react";
import useFilteredListStories from "../../../hooks/useFilteredListStories";
import { Logger } from "../../../utils/helper";

export const MainHome = () => {
  const [stories, setStories] = useState([]);
  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data);
  }
  const {getFilteredListStories} = useFilteredListStories({onComplete: onConpleteGetFilteredListStories});
  React.useEffect(()=>{
    getFilteredListStories();
  },[]);
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
