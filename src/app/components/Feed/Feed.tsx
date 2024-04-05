import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { StyledLabel } from "../Common/StyledLabel";
import React, { useState } from "react";
import useFilteredListStories from "../../../hooks/useFilteredListStories";
import ReactPaginate from "react-paginate";
import useListPost from "../../../hooks/useListPost";
import { PostDetail } from "../../../api/interfaces/postDetail";
import { Post } from "../Post";
import { ListPost } from "./ListPost";
import { TypeListPost } from "../../../api/interfaces/listPost";
import { getListPost } from "../../../api/modules/post/listPost";

export const Feed = () => {
  const [posts, setPosts] = useState([]);
  
  React.useEffect(() => {
    const getPost = async () => {
      try{
        const params : TypeListPost = {page: 0, size: 5};
        const response = await getListPost(params);
        const data = response?.data?.data;
        setPosts(data);
      }catch(err){
        console.log(err);
      }
    }
    getPost();
  }, []);
  React.useEffect(() => {
    console.log('post changed');
  }, [posts])
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          backgroundColor: StyleConstants.BACKGROUND_MAIN_COLOR,
          justifyItems: 'center',
          alignItems: 'center'
        }}
      >
        <div 
        style={{display: 'flex', alignContent: 'center', flexDirection: 'column', justifyItems: 'center', width: "75%", gap: '20px'}}>
          <ListPost 
          listItems={posts}
          />
          
        </div>
      </div>
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
  padding: 12px;
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
