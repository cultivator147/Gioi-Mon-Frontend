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
import ReactPaginate from "react-paginate";
import { relative } from "path";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";

export const MainHome = () => {
  const [stories, setStories] = useState([]);
  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data?.content);
    setTotalPages(data?.totalPages);
  }
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
};
  const {getFilteredListStories} = useFilteredListStories({onComplete: onConpleteGetFilteredListStories, categoryId: 1,   page: currentPage,size: +StyleConstants.ITEMS_PER_PAGE,});
  React.useEffect(()=>{
    getFilteredListStories();
  },[currentPage]);
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
              <div style={{display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between', height: '100%'}}>
              <ListStoriesGrid listItems={stories} page={0} size={20} />
              <div style={{display: 'flex', justifyContent: 'center'}}>
              <ReactPaginate
              nextLabel="next >"
              onPageChange={ (selectedItem) => handlePageChange(selectedItem.selected)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
              </div>

              </div>
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
height: 100%;
width: 100%;
`;
const SecondRow = styled.div`
height: 100%;

  width: 100%;
`;
const First = styled.div`
height: 100%;

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
    height: 100%;
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
