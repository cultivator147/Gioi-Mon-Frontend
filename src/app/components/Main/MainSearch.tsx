import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListStoriesGrid } from "./ListStoriesHome";
import React, { useState } from "react";
import useFilteredListStories, {
  IUseFilteredListStories,
} from "../../../hooks/useFilteredListStories";
import { useHref, useParams } from "react-router-dom";
import { Category } from "../../../api/interfaces/category";
import { getAllCategories } from "../../../api/modules/stories/category";
import { Logger } from "../../../utils/helper";
import { CategoryWrapper } from "../NavBar/CategoryExpand";
import { StyledButton } from "../Common/StyledButton";
import { ids } from "webpack";

export const MainSearch = () => {
  var categoryId = useParams().categoryid || "1";
 
  const writingState = useParams().writing_state || "0";
  const [stories, setStories] = useState([]);
  const [listCategory, setListCategory] = useState<Category[]>([]);

  const onConpleteGetFilteredListStories = (data: any) => {
    setStories(data);
  };
  const filtered: IUseFilteredListStories = {
    onComplete: onConpleteGetFilteredListStories,
    categoryId: categoryId,
    writingState: parseInt(writingState)
  };
  const { getFilteredListStories } = useFilteredListStories(filtered);

  React.useEffect(() => {
    getFilteredListStories();
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
      <div style={{ width: "60%",  }}>
        <div style={{ width: "100%", display: "flex" , gap: '10px', }}>
          <SubWrapperColumn>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                padding: "8px",
                marginBottom: "16px",
                boxSizing: 'border-box',
                gap: '12px'
              }}
            >
              <StyledLabel
                color="#000000"
                fontSize={"2em"}
                title={`Truyện tranh ${
                  listCategory[parseInt(categoryId) - 1]?.name
                } - Mới cập nhật`}
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
              <div style={{width: '100%', display: 'flex', justifyContent: 'center', gap: '10px'}}>
                  <StyledButton label={"Tất cả"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Hoàn thành"} backgroundColor="#ffffff" href={`/tim-truyen/${categoryId}/2`}/>
                  <StyledButton label={"Đang tiến hành"} backgroundColor="#ffffff" href={`/tim-truyen/${categoryId}/1`}/>
              </div>

              <div style={{display: 'flex', width: '100%', }}>
                <div style={{width:'8em'}}>
                  <StyledLabel fontSize={'1.2em'} title={"Sắp xếp theo"} color="#000000" />
                </div>
                <div style={{width: '100%', display: 'block', gap: '10px'}}>
                  <StyledButton label={"Ngày cập nhật"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Truyện mới"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Top all"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Top tháng"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Top tuần"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Top ngày"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Lượt theo dõi"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Bình luận"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>
                  <StyledButton label={"Số chapter"} backgroundColor="#ffffff" customStyle={{}} href={`/tim-truyen/${categoryId}/0`}/>

                </div>
              </div>

            </div>
            <FirstRow>
              <ListStoriesGrid listItems={stories} page={0} size={20} />
            </FirstRow>
            <SubWrapperRow></SubWrapperRow>
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
                    <CategoryWrapper>
                      <a
                        style={{ textDecoration: "none" }}
                        color="black"
                        href={"/tim-truyen/" + category.id}
                      >
                        {category.name}
                      </a>
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
const ListCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
  gap: 8px;
`;
