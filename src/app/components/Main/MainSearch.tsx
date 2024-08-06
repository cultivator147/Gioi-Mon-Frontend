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
import { Flex, Stack } from "@mantine/core";
import { LIST_LEADERBOARD } from "../NavBar/LeaderboardExpand";
export const MainSearch = () => {
  const categoryId = useParams().categoryid || "2";
  const keyword = useParams().keyword || "";
  const writingState = useParams().writing_state || "0";
  const sortBy = useParams().sort_by;
  const [stories, setStories] = useState([]);
  const [listCategory, setListCategory] = useState<Category[]>([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const leaderboardId = +(useParams().leaderboardid || "0");
  const convertTitle = () => {
    var title = `Thể loại ${listCategory[parseInt(categoryId) - 1]?.name}`;
    if (writingState != undefined) {
      const writingStatusWord =
        writingState === "0"
          ? "Tất cả"
          : writingState === "2"
          ? "Hoàn thành"
          : "Đang tiến hành";
      title = title + ` - ${writingStatusWord}`;
    }
    if (sortBy != undefined) {
      const sortByWord =
        sortBy == "LAST_UPDATE_DATE"
          ? "Ngày cập nhật"
          : sortBy == "VIEWS"
          ? "Lượt xem"
          : sortBy == "CHAPTERS"
          ? "Lượng chapter"
          : "Tất cả";
      title = title + " - " + sortByWord;
    }
    if (leaderboardId != 0) {
      title = `Bảng xếp hạng: ${LIST_LEADERBOARD[leaderboardId - 1]?.displayName}`;
    }
    if (keyword != "") {
      title = "Tìm kiếm truyện bằng từ khoá";
    }
    return title;
  };
  const convertSubtitle = () => {
    var subtitle = listCategory[parseInt(categoryId) - 1]?.description;
    if (keyword != "") {
      subtitle = "Tất cả thể loại truyện tranh";
    }
    if (leaderboardId != 0) {
      subtitle = "Tất cả thể loại truyện tranh";
    }
    return subtitle;
  };
  const handlePageChange = async (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const onConpleteGetFilteredListStories = (data: any, totalPages: any) => {
    setStories(data);
    setTotalPages(totalPages || 1);
  };
  const filtered: IUseFilteredListStories = {
    onComplete: onConpleteGetFilteredListStories,
    categoryId: categoryId,
    writingState: parseInt(writingState) || 0,
    keyword: keyword,
    sortBy: sortBy || "LAST_UPDATE_DATE",
    page: currentPage,
    size: +StyleConstants.ITEMS_PER_PAGE,
    leaderboardType: LIST_LEADERBOARD[leaderboardId - 1]?.name,
  };
  const { getFilteredListStories, getLeaderboardStory } =
    useFilteredListStories(filtered);

  React.useEffect(() => {
    if (leaderboardId != 0) {
      setStories([]);
      getLeaderboardStory();
    } else {
      setStories([]);
      getFilteredListStories();
    }
  }, [currentPage, categoryId, keyword, writingState, sortBy, leaderboardId]);

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
                  title={
                    convertSubtitle()
                    //   `${
                    //   listCategory[parseInt(categoryId) - 1]?.description
                    // }`
                  }
                />
              </div>
              {leaderboardId < 1 && (
                <Stack>
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
                      backgroundPath={"/WRITING_STATE=0"}
                    />
                    <ButtonLinkTab
                      label={"Hoàn thành"}
                      to={`/tim-truyen/${categoryId}/WRITING_STATE=2`}
                      backgroundPath={"/WRITING_STATE=2"}
                    />
                    <ButtonLinkTab
                      label={"Đang tiến hành"}
                      to={`/tim-truyen/${categoryId}/WRITING_STATE=1`}
                      backgroundPath={"/WRITING_STATE=1"}
                    />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "24px",
                    }}
                  >
                    <div style={{ width: "12em" }}>
                      <Flex sx={{height: '100%'}} align={'center'}>
                      <StyledLabel

                        fontSize={"1.2em"}
                        title={"Sắp xếp theo:"}
                        color="#000000"
                      />
                      </Flex>
                     
                    </div>
                    <Flex direction={"column"} style={{ width: "100%" }}>
                      <Flex>
                        <ButtonLinkTab
                          to={`/tim-truyen/${categoryId}/${writingState}/sort_by=LAST_UPDATE_DATE`}
                          backgroundPath={"/sort_by=LAST_UPDATE_DATE"}
                        >
                          Ngày cập nhật
                        </ButtonLinkTab>
                        <ButtonLinkTab
                          label={"Lượt xem"}
                          to={`/tim-truyen/${categoryId}/${writingState}/sort_by=VIEWS`}
                          backgroundPath={"/sort_by=VIEWS"}
                        />
                        <ButtonLinkTab
                          label={"Số chapter"}
                          to={`/tim-truyen/${categoryId}/${writingState}/sort_by=CHAPTERS`}
                          backgroundPath={"/sort_by=CHAPTERS"}
                        />
                      </Flex>
                    </Flex>
                  </div>
                </Stack>
              )}
              {leaderboardId >= 1 && (
                <Stack>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      marginTop: "24px",
                    }}
                  >
                    <div style={{ width: "12em" }}>
                    <Flex sx={{height: '100%'}} align={'center'}>
                      <StyledLabel
                        fontSize={"1.2em"}
                        title={"Xếp hạng theo:"}
                        color="#000000"
                      />
                      </Flex>
                    </div>
                    <Flex direction={"column"} style={{ width: "100%" }}>
                      <Flex>
                        <ButtonLinkTab
                        label="Top toàn bộ"
                          to={`/tim-truyen/leaderboard/1`}
                          backgroundPath={"/tim-truyen/leaderboard/1"}
                        >
                        </ButtonLinkTab>
                        <ButtonLinkTab
                          label={"Top tháng"}
                          to={`/tim-truyen/leaderboard/2`}
                          backgroundPath={"/tim-truyen/leaderboard/2"}
                        />
                        <ButtonLinkTab
                          label={"Top tuần"}
                          to={`/tim-truyen/leaderboard/3`}
                          backgroundPath={"/tim-truyen/leaderboard/3"}
                        ></ButtonLinkTab>
                        </Flex>
                        <Flex>
                            <ButtonLinkTab
                          label={"Top ngày"}
                          to={`/tim-truyen/leaderboard/4`}
                          backgroundPath={"/tim-truyen/leaderboard/4"}
                        />
                         <ButtonLinkTab
                          label={"Số lượng chương"}
                          to={`/tim-truyen/leaderboard/5`}
                          backgroundPath={"/tim-truyen/leaderboard/5"}
                        />
                        <ButtonLinkTab
                          label={"Số lượng bài viết"}
                          to={`/tim-truyen/leaderboard/6`}
                          backgroundPath={"/tim-truyen/leaderboard/6"}
                        />
                         {/* <ButtonLinkTab
                          label={"Lượt xem"}
                          to={`/tim-truyen/leaderboard/6`}
                          backgroundPath={"/tim-truyen/leaderboard/6"}
                        /> */}
                      
                      </Flex>
                    </Flex>
                  </div>
                </Stack>
              )}
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
