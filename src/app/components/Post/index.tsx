import styled from "styled-components";
import { StyledImage } from "../Common/Image";
import { StyledLabel } from "../Common/StyledLabel";
import { Link, useNavigate } from "react-router-dom";
import { StyledNavButton } from "../Common/Button/StyledNavButton";
import { favPost } from "../../../api/modules/post/post";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { useSelector } from "react-redux";
import { Button, Flex } from "@mantine/core";
import { StyledButton } from "../Common/Button/StyledButton";
import { GradientButton } from "../Common/Button/GradientButton";
import { OutlineButton } from "../Common/Button/OutlineButton";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { ReadButton } from "../Common/Button/ReadButton";
export interface PostProps {
  id: any;
  owner_id: any;
  story_id: any;
  owner_avatar: string;
  owner_name: string;
  title?: string;
  content?: string;
  images: string[];
  favourite_count: any;
  avarageFavouritePoint: any;
  comment_conut: any;
  favourited?: number;
  favourited_point?: any;
}
export const Post = (props: PostProps) => {
  const [favourited, setFavourited] = useState<number>(props.favourited || 0);
  const favouritedPoint = props.favourited_point || 0;
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const onClickInterest = async () => {
    const favourite = favourited === 0 ? 1 : 0;
    const response: any = await favPost(user?.token, {
      postId: props.id,
      favourite: favourite,
      favouritePoint: 7,
    });
    console.log(response);
    if (response?.data?.code === 0) {
      if (favourite === 1) {
        console.log('favourited');
        setFavourited(1);
      } else {
        console.log('unfavourited');
        setFavourited(0);
      }
    }
  };
  const buttonStyle = {
    height: "2.5rem",
    width: '8rem',
    color: "#000000",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: 'pointer',
    background: favourited === 1 ? 'linear-gradient(90deg, #e46125 -0.01%, #c91a44 50%, #a12fa3 100%)' : '#FFFFFF',
  };
  const commentButton = {
    height: "2.5rem",
    width: '6rem',
    color: "#000000",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: 'pointer',
    background: '#FFFFFF',
  };

  return (
    <PostWrapper>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "60%", padding: "4px" }}>
          <div style={{ padding: "8px" }}>
            <StyledImage
              src={props.owner_avatar}
              onClick={() => navigate("/user/profile")}
              width={50}
              height={50}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: '4px', padding: '4px' }}>
            <StyledLabel
              title={props.owner_name}
              fontSize={"1.2rem"}
              color="#0"
            />
            <StyledLabel title="4h" fontSize={"1.1rem"} color="#0" />
          </div>
        </div>

        <div
          style={{
            width: "40%",
            padding: "8px",
            display: "flex",
            alignContent: "center",
            justifyContent: "flex-end",
          }}
        >
              <ReadButton
              onClick={() => {navigate(`/truyen-tranh/${props.story_id}`)}}
              >
                {'Đọc ngay'}
              </ReadButton>
        </div>
      </div>
    
      <PostBody>
        <div>{props.title}</div>
        <div>{props.content}</div>
        <div>
          {props?.images?.map((img) => (
            <StyledImage src={img} width={200} height={200} />
          ))}
        </div>
      </PostBody>

      <PostFooter>
      <Flex justify={'center'}>
      </Flex>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", gap: "4px", justifyItems:'center', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faHeart} color={favourited == 1 ? "red" : "gray"}/>
            <StyledLabel title={props.favourite_count} color="#000000" fontSize={'1.2rem'}/>
            {/* <StyledLabel title={props.avarageFavouritePoint} color="#000000" /> */}
          </div>
          <div style={{marginRight: '12px'}}>
            <StyledLabel title={`${props.comment_conut} Bình luận`} color="#000000" fontSize={'1.2rem'}/>
          </div>
        </div>
      <div style={{width: '100%', opacity: '70%', height: '1px', backgroundColor: 'grey'}}/>

        <div style={{ display: "flex", justifyContent: "space-between", paddingTop: '12px'}}>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={buttonStyle}
              onClick={onClickInterest}
            >
              {favourited === 0 ? 'Quan tâm' : 'Bỏ quan tâm'}
            </button>
          </div>
          <div>
            <button
            style={commentButton}>
              {'Bình luận'}
            </button>
          </div>
          <div style={{width: '10%'}}>
          {/* <button
            style={commentButton}>
              {'Chia sẻ'}
            </button> */}
          </div>
        </div>

      </PostFooter>
    </PostWrapper>
  );
};
const PostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-radius: 10px;
`;
const PostHeader = styled.div`
  padding: 12px;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  height: 20%;
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 4px;
  padding-top: 16px;
  padding-bottom: 16px;
  padding-right: 4px;
`;
const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
`;
const FavouriteButton = styled.button`
  height: 45px;
  color: #ffffff;
  border-radius: 8px;
  font-size: 20px;
  font-weight: 600;
  line-height: 25px;
  background: linear-gradient(90deg, #e46125 -0.01%, #c91a44 50%, #a12fa3 100%);
`;
