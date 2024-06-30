import { PostDetail } from "../../../api/interfaces/postDetail";
import { Post } from "./Post";
import styled from "styled-components";
export interface ListPostProps {
  listItems: PostDetail[];
  page?: number;
  size?: number;
}
export const ListPost = (props: ListPostProps) => {
  const items: PostDetail[] = props.listItems;
  return (
    <Wrapper>
      {items.map((item: PostDetail) => (
        <Post
          id={item.id}
          owner_id={item.ownerId}
          story_id={item.storyId}
          owner_avatar={item.ownerAvatar}
          owner_name={item.ownerNickname} 
          title={item?.title}
          content={item?.content}
          images={item?.images} 
          favourite_count={item.favouriteCount} 
          avarageFavouritePoint={item?.averageFavouritePoint} 
          comment_conut={item.commentCount}
          favourited={item.favourited}     
          favourited_point={item.favouritePoint}     
          createTime={item.createTime}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
display: flex;
align-content: center;
flex-direction: column;
justify-items: center;
gap: 20px;
`;


