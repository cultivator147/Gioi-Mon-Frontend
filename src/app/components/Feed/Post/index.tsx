import styled from "styled-components";
import { StyledImage } from "../../Common/Image";
import { StyledLabel } from "../../Common/StyledLabel";
import { Link, useNavigate } from "react-router-dom";
import { StyledNavButton } from "../../Common/Button/StyledNavButton";
import { favPost } from "../../../../api/modules/post/post";
import { getUserSelector } from "../../../../redux-toolkit/slice/userSlice/selector";
import { useSelector } from "react-redux";
import { Button, Flex, TextInput } from "@mantine/core";
import { StyledButton } from "../../Common/Button/StyledButton";
import { GradientButton } from "../../Common/Button/GradientButton";
import { OutlineButton } from "../../Common/Button/OutlineButton";
import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faHeartCirclePlus,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { ReadButton } from "../../Common/Button/ReadButton";
import { inherits } from "util";
import { createComment, getComments } from "../../../../api/modules/post/commentPost";
import useModal from "../../Modal/useModal";
import { CommentModal } from "./CommentModal";
import { convertTimeToFacebookStyle } from "../../../../utils/helper";
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
  favourited: number;
  favourited_point : any;
  isModal?: boolean;
  createTime?: any;
}
export const Post = (props: PostProps) => {
  console.log(props);
  const {isModal} = props || false;
  const [favourited, setFavourited] = useState(props.favourited);
  const [favouriteCount, setFavouriteCount] = useState(props.favourite_count);
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const [comments, setComments] = useState<CommentProps[]>([]);
  const inputComment = useRef(null);
  const [commentContent, setCommentContent] = useState("");
  const [commentCount, setCommentCount] = useState(props.comment_conut);
  const { isShowing, toggle } = useModal();
  const onClickShowComment = () => {
    toggle();
  };
  const onHiden = async () => {
    toggle();
    //TODO: get post detail here
    const response: any = await getComments(user?.token, {
      postId: props.id,
    });
    if (response?.data?.code === 0) {
      console.log('fetch comments successfully!');
      setComments(response?.data?.data);
    }else{
      console.log('fetch comments failed!');
    }
  }
  const clickSendComment = async () => {
    const response : any = await createComment(user?.token, {
      postId: props.id,
      commentText: commentContent,
    });
    if (response?.data?.code === 0) {
      console.log('commented successfully!', response?.data?.data?.commentText);
      setComments([...comments, response?.data?.data]);
      setCommentContent("");
      setCommentCount(commentCount + 1)
    }else{
      console.log('commented failed!');
    }
  }
  React.useEffect(() => {
    const fetchComments = async () => {
      const response: any = await getComments(user?.token, {
        postId: props.id,
      });
      if (response?.data?.code === 0) {
        console.log('fetch comments successfully!');
        setComments(response?.data?.data);
      }else{
        console.log('fetch comments failed!');
      }
    };
    isModal && fetchComments();
  },[])
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
        console.log("favourited");
        setFavourited(1);
        setFavouriteCount(favouriteCount + 1);
      } else {
        console.log("unfavourited");
        setFavourited(0);
        setFavouriteCount(favouriteCount - 1);
      }
    }
  };
  const buttonStyle = {
    height: "2.5rem",
    width: "8rem",
    color: "#000000",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    background:
      favourited === 1
        ? "linear-gradient(90deg, #e46125 -0.01%, #c91a44 50%, #a12fa3 100%)"
        : "#FFFFFF",
  };
  const commentButton = {
    height: "2.5rem",
    width: "6rem",
    color: "#000000",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    background: "#FFFFFF",
  };

  return (
    <PostWrapper>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", width: "60%", padding: "4px" }}>
          <div style={{ padding: "8px" }}>
            <StyledImage
              src={props.owner_avatar}
              onClick={() => navigate(`/user/profile/${props.owner_id}`)}
              width={50}
              height={50}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              padding: "4px",
            }}
          >
            <StyledLabel
              title={props.owner_name}
              fontSize={"1.2rem"}
              color="#0"
            />
            <StyledLabel title={convertTimeToFacebookStyle(props.createTime)} fontSize={"1.1rem"} color="#0" />
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
            onClick={() => {
              navigate(`/truyen-tranh/${props.story_id}`);
            }}
          >
            {"Đọc ngay"}
          </ReadButton>
        </div>
      </div>

      <PostBody>
        <Flex justify={"center"} style={{ width: "100%" }} className="">
          <Link to={`/truyen-tranh/${props.story_id}`}>
            <text className="gradient-text">{props.title}</text>
          </Link>
        </Flex>
        <div>{props.content}</div>
        <Flex justify={'center'} style={{width: '100%'}}>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "4px",
            width: '100%'
          }}
        >
          {props?.images?.map((img) => (
            <Flex justify={'center'}>
              <StyledImage src={img} />
            </Flex>
          ))}
        </div>
        </Flex>
      </PostBody>
      <CommentModal
            isShowing={isShowing}
            hide={onHiden}
            props = {
              props
            }
          />
      <PostFooter>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
              justifyItems: "center",
              alignItems: "center",
              padding: "0px 16px",
            }}
          >
            <FontAwesomeIcon
              icon={faHeart}
              color={favourited === 1 ? "red" : "gray"}
            />
            <StyledLabel
              title={favouriteCount}
              color="#000000"
              fontSize={"1.2rem"}
            />
            {/* <StyledLabel title={props.avarageFavouritePoint} color="#000000" /> */}
          </div>
          <div style={{ marginRight: "12px" }}>
            <StyledLabel
            addtionalStyle={{cursor: "pointer"}}
              onClick={toggle}
              title={`${commentCount} Bình luận`}
              color="#000000"
              fontSize={"1.2rem"}
            />
          </div>
        </div>
        <div
          style={{
            width: "96%",
            opacity: "70%",
            height: "1px",
            backgroundColor: "grey",
          }}
        />

        <div
          style={{
            width: "100%",
            display: "flex",
            paddingLeft: "16px",
            justifyContent: "center",
            paddingTop: "12px",
            gap: "32px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button style={buttonStyle} onClick={onClickInterest}>
              {" "}
              {
                <FontAwesomeIcon
                  style={{ marginRight: "2px" }}
                  icon={faHeartCirclePlus}
                />
              }
              {favourited === 0 ? "Quan tâm" : "Bỏ quan tâm"}
            </button>
          </div>
          <div>
            <button 
            style={commentButton}
            onClick={onClickShowComment}
            >
              <FontAwesomeIcon
                style={{ marginRight: "2px" }}
                icon={faComment}
              />
              {"Bình luận"}
            </button>
          </div>
        </div>

        <div
          style={{
            width: "96%",
            opacity: "70%",
            height: "1px",
            marginTop: "12px",
            marginBottom: "12px",
            backgroundColor: "grey",
          }}
        />
        <div style={{width: '100%'}}>
          {comments.map((comment) => (
            <PostComment
              friendName={comment?.friendName || "Hieu"}
              commentText={
                comment?.commentText || "Đúng vậy truyện này hay ghê luôn ý"
              }
              friendAvatar={
                comment?.friendAvatar ||
                "https://i.pinimg.com/236x/44/93/f6/4493f6529a5b708ac20bbb56700f0274.jpg"
              }
              friendId={comment?.friendId}
              postId={props.id}
            />
          ))}
        </div>

        <Flex
          align={"center"}
          style={{ width: "100%", height: "3rem", padding: "8px", gap: "8px" }}
        >
          <Flex align={"center"} style={{ height: "2.5rem" }}>
            <StyledImage
              src={props?.owner_avatar}
              onClick={() => navigate(`/user/profile/${props.owner_id}`)}
              width={50}
              height={inherits}
            />
          </Flex>
          <div
            style={{
              height: "inherits",
              width: "100%",
            }}
          >
            <TextInput
              id="comment-input"
              onChange={(event) => setCommentContent(event.currentTarget.value)}
              ref={inputComment}
              style={{ width: "100%" }}
              placeholder="Để lại nhận xét của bạn"
              value={commentContent}
            />
          </div>
          <Flex
            align={"center"}
            justify={"center"}
            style={{
              cursor: "pointer",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "grey",
            }}
          >
            <FontAwesomeIcon
              style={{ cursor: "pointer" }}
              icon={faPaperPlane}
              onClick={clickSendComment}
            />
          </Flex>
        </Flex>
      </PostFooter>
    </PostWrapper>
  );
};
interface CommentProps {
  friendAvatar?: any;
  friendName?: any;
  friendId: any;
  postId: any;
  createTime?: any;
  commentText?: any;
  commentImages?: any;
}
const PostComment = (props: CommentProps) => {
  const navigate = useNavigate();

  return (
    <CommentStyle>
      <div style={{ padding: "8px" }}>
        <StyledImage
          src={props?.friendAvatar}
          onClick={() => navigate(`/user/profile/${props.friendId}`)}
          width={50}
          height={50}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          padding: "4px",
        }}
      >
        <CommentContent>
          <Flex direction={"column"}>
            <StyledLabel
              title={props.friendName}
              fontSize={"1.2rem"}
              color="#0"
            />
            <StyledLabel
              title={props.commentText}
              fontSize={"1.2rem"}
              color="#0"
            />
          </Flex>
        </CommentContent>

        <StyledLabel title="4h" fontSize={"1.1rem"} color="#0" />
      </div>
    </CommentStyle>
  );
};
const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  background-color: gainsboro;
  border-radius: 20px;
  padding: 8px 16px;
`;
const CommentStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
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
  gap: 16px;
`;
const PostFooter = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  align-items: center;
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
