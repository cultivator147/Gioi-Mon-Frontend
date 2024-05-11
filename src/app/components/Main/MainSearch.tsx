import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListStoriesGrid } from "./ListStoriesHome";
import React, { useState } from "react";
import useFilteredListStories, {
  IUseFilteredListStories,
} from "../../../hooks/useFilteredListStories";
import { useParams } from "react-router-dom";
import { Category } from "../../../api/interfaces/category";
import { getAllCategories } from "../../../api/modules/stories/category";
import { Logger } from "../../../utils/helper";
import { CategoryWrapper, ListCategory } from "../NavBar/CategoryExpand";
import { StyledNavButton } from "../Common/Button/StyledNavButton";
import ReactPaginate from "react-paginate";
import "./pagination.css";
import { ButtonLinkTab } from "../Common/Button/ButtonLinkTab";
import { Flex } from "@mantine/core";
export const MainSearch = () => {
  //TODO: Parse the location.path to params.
  const categoryId = useParams().categoryid || "2";
  const keyword = useParams().keyword || "";
  const writingState = useParams().writing_state;
  const sortBy = useParams().sort_by;
  const [stories, setStories] = useState([]);
  const [listCategory, setListCategory] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const convertTitle = () => {
    var title = "";
    if(keyword != ""){
      title = "Tìm kiếm truyện bằng từ khoá"
    }else if(writingState != undefined){
      const writingStatusWord = writingState === "0" ? "Tất cả" : (writingState === "2" ? "Hoàn thành" : "Đang tiến hành");
      title = `Truyện sắp xếp theo tình trạng viết - ${writingStatusWord}`;
      if(sortBy != undefined){
        title = "Truyện sắp xếp theo Truyện mới";
      }
    }else if(sortBy != ""){
      title = "Truyện sắp xếp theo Truyện mới";
    }else{
      title = `Truyện tranh ${listCategory[parseInt(categoryId) - 1]?.name} - Mới cập nhật`;
    }
    return title;
  }
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data?.content);
    setTotalPages(data.totalPages);
  };
  const filtered: IUseFilteredListStories = {
    onComplete: onConpleteGetFilteredListStories,
    categoryId: categoryId,
    writingState: parseInt(writingState || "0"),
    keyword: keyword,
    sortBy: sortBy || "LAST_UPDATE_DATE",
    page: currentPage,
    size: +StyleConstants.ITEMS_PER_PAGE,
  };
  const { getFilteredListStories } = useFilteredListStories(filtered);

  React.useEffect(() => {
    getFilteredListStories();
    console.log(categoryId);
  }, [currentPage, categoryId, keyword, writingState, sortBy]);

  React.useEffect(() => {
    const getAll = async () => {
      try {
        const response = await getAllCategories();
        setListCategory(response.data?.data);
      } catch (err) {
        Logger(err);
      }
    };
    getAll();
  }, []);

  return (
    <Wrapper>
      <div style={{ width: "70%" }}>
        <div style={{ width: "100%", display: "flex", gap: "10px" }}>
          <SubWrapperColumn>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
                boxSizing: "border-box",
                gap: "12px",
              }}
            >
              <StyledLabel
                color="#000000"
                fontSize={"2em"}
                title={convertTitle()}
              />
              <div
                style={{
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "gray",
                  padding: "4px",
                }}
              >
                <StyledLabel
                  color="#000000"
                  fontSize={"1.1em"}
                  title={`${
                    listCategory[parseInt(categoryId) - 1]?.description
                  }`}
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <ButtonLinkTab
                  label={"Tất cả"}
                  to={`/tim-truyen/${categoryId}/WRITING_STATE=0`}
                  backgroundPath={'/WRITING_STATE=0'}
                />
                <ButtonLinkTab
                  label={"Hoàn thành"}
                  to={`/tim-truyen/${categoryId}/WRITING_STATE=2`}
                  backgroundPath={'/WRITING_STATE=2'}
                />
                <ButtonLinkTab
                  label={"Đang tiến hành"}
                  to={`/tim-truyen/${categoryId}/WRITING_STATE=1`}
                  backgroundPath={'/WRITING_STATE=1'}
                />
              </div>

              <div
                style={{ display: "flex", width: "100%", marginTop: "24px" }}
              >
                <div style={{ width: "8em" }}>
                  <StyledLabel
                    fontSize={"1.2em"}
                    title={"Sắp xếp theo"}
                    color="#000000"
                  />
                </div>
                <Flex
                  direction={"column"}
                  style={{ width: "100%" }}
                >
                  <Flex>
                    <ButtonLinkTab
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=LAST_UPDATE_DATE`}
                      backgroundPath={"/sort_by=LAST_UPDATE_DATE"}
                    >
                      Ngày cập nhật
                    </ButtonLinkTab>
                    <ButtonLinkTab
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=NEW`}
                      backgroundPath={"/sort_by=NEW"}
                    >
                      Truyện mới
                    </ButtonLinkTab>

                    <ButtonLinkTab
                      label={"Top all"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=TOP_ALL`}
                      backgroundPath={"/sort_by=TOP_ALL"}
                    />
                  </Flex>
                  <Flex>
                    <ButtonLinkTab
                      label={"Top tháng"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=TOP_MONTHLY`}
                      backgroundPath={"/sort_by=TOP_MONTHLY"}
                    />
                    <ButtonLinkTab
                      label={"Top tuần"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=TOP_WEEKLY`}
                      backgroundPath={"/sort_by=TOP_WEEKLY"}
                    />
                    <ButtonLinkTab
                      label={"Top ngày"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=TOP_DAILY`}
                      backgroundPath={"/sort_by=TOP_DAILY"}
                    />
                  </Flex>
                  <Flex>
                    <ButtonLinkTab
                      label={"Lượt theo dõi"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=FOLLOWER`}
                      backgroundPath={"/sort_by=FOLLOWER"}
                    />
                    <ButtonLinkTab
                      label={"Bình luận"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=COMMENT`}
                      backgroundPath={"/sort_by=COMMENT"}
                    />
                    <ButtonLinkTab
                      label={"Số chapter"}
                      to={`/tim-truyen/${categoryId}/${writingState}/sort_by=CHAPTER`}
                      backgroundPath={"/sort_by=CHAPTER"}
                    />
                  </Flex>
                </Flex>
              </div>
            </div>
            <FirstRow>
              <ListStoriesGrid
                listItems={stories}
                page={currentPage}
                size={20}
              />
              <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactPaginate
                  nextLabel="next >"
                  onPageChange={(selectedItem) =>
                    handlePageChange(selectedItem.selected)
                  }
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
            </FirstRow>
          </SubWrapperColumn>
          <div style={{ flex: 1 }}>
            <CategoryRightWrapper>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <StyledLabel fontSize="20px" color="#6AB5CE" title="Thể loại" />
                <ListCategory>
                  {listCategory.map((category) => (
                    <CategoryWrapper
                      color="black"
                      to={"/tim-truyen/" + category.id}
                    >
                      {category.name}
                    </CategoryWrapper>
                  ))}
                </ListCategory>
              </div>
            </CategoryRightWrapper>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const FirstRow = styled.div`
  width: 100%;
`;

const Wrapper = styled(PageWrapper)`
  background-color: ${StyleConstants.BACKGROUND_MAIN_COLOR};
  height: 100%;
  min-height: 500px;
  justify-content: center;
  align-items: center;
  display: flex;

  ${SubWrapperRow} {
    width: 100%;
    flex: 1;
    justify-content: start;
    align-items: start;
    gap: 10px;
  }
  ${SubWrapperColumn} {
    flex: 2;
    background-color: #ece7e7;
    justify-content: start;
    align-items: start;
    gap: 10px;
  }
`;
const CategoryRightWrapper = styled.div`
  width: 100%;
  padding: 8px;
  flex: 1;
  border-width: 1px;
  border-style: solid;
  border-color: grey;
`;

