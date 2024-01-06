import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListSuggestedStories } from "./ListSuggestedStories";
import { ListStoriesGrid } from "./ListStoriesHome";
import React, { useState } from "react";
import useFilteredListStories, {
  IUseFilteredListStories,
} from "../../../hooks/useFilteredListStories";
import { Logger } from "../../../utils/helper";
import { useAppSelector } from "../../../redux-toolkit/hooks";
import { useParams } from "react-router-dom";
import { getFilteredListStoriesRequest } from "../../../api/modules/stories/stories";

export const MainSearch = () => {
  const categoryId = useParams().categoryid;

  const [stories, setStories] = useState([]);

  // const currentCategory = useAppSelector((state) => state.category.id);
  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data);
  }
  const filtered : IUseFilteredListStories = {onComplete: onConpleteGetFilteredListStories, categoryId: categoryId};
  const {getFilteredListStories} = useFilteredListStories(filtered);

  React.useEffect(() => {
    getFilteredListStories();
  }, []);
  return (
    <Wrapper>
      <SubWrapperColumn>
        <StyledLabel title="Truyện mới cập nhật" color="#D44C4C" />
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
