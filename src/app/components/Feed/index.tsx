import ReactPaginate from "react-paginate";
import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import { ListStoriesGrid } from "../Main/ListStoriesHome";
import { ListSuggestedStories } from "../Main/ListSuggestedStories";
import { SubRight } from "../Main/SubRight";
import { SubWrapperColumn, SubWrapperRow, PageWrapper } from "../PageWrapper";
import { Post } from "../Post";

export const Feed = () => {
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          backgroundColor: StyleConstants.BACKGROUND_MAIN_COLOR,
          gap: "8px",
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <div 
        style={{display: 'flex', alignContent: 'center', flexDirection: 'column', justifyItems: 'center', width: "75%", gap: '20px'}}>
          <Post
            owner_id={"1"}
            owner_avatar={
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg"
            }
            owner_name={"M Hieu"}
            title={"Bộ này quá đỉnh !"}
            content={"Mời ae đọc bộ này, main rất bá !"}
            images={[
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
            ]}
          />
          <Post
            owner_id={"1"}
            owner_avatar={
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg"
            }
            owner_name={"M Hieu"}
            title={"Bộ này quá đỉnh !"}
            content={"Mời ae đọc bộ này, main rất bá !"}
            images={[
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
            ]}
          />
          <Post
            owner_id={"1"}
            owner_avatar={
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg"
            }
            owner_name={"M Hieu"}
            title={"Bộ này quá đỉnh !"}
            content={"Mời ae đọc bộ này, main rất bá !"}
            images={[
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
            ]}
          />
           <Post
            owner_id={"1"}
            owner_avatar={
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg"
            }
            owner_name={"M Hieu"}
            title={"Bộ này quá đỉnh !"}
            content={"Mời ae đọc bộ này, main rất bá !"}
            images={[
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
              "https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg",
            ]}
          />
        </div>
      </div>
    </Wrapper>
  );
};
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
