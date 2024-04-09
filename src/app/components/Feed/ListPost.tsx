import { PostDetail } from "../../../api/interfaces/postDetail";
import { Post } from "../Post";
import styled from "styled-components";
export interface ListPostProps {
  listItems: PostDetail[];
  page?: number;
  size?: number;
}
export const ListPost = (props: ListPostProps) => {
  var items: PostDetail[] = props.listItems;
  const page = props.page || 0;
  const size = props.size || 5;
  if (items.length > 5) {
    items = items.slice(page * size, (page + 1) * size);
  }
  return (
    <Wrapper>
      {items.map((item: PostDetail) => (
        <Post
          owner_id={item.ownerId}
          story_id={item.storyId}
          owner_avatar={"https://cdnntx.com/nettruyen/thumb/giao-duc-chan-chinh.jpg"}
          owner_name={"Trinh M Hieu"} title={item?.title}
          content={item?.content}
          images={item?.images}
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
width: 75%;
gap: 20px;
`;


