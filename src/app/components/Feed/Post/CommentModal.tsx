import { Flex } from "@mantine/core";
import { Post, PostProps } from ".";
import { StyledLabel } from "../../Common/StyledLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export const CommentModal = ({ isShowing, hide, props }: any) => {
  console.log(props);
  const {
    id,
    owner_id,
    story_id,
    owner_avatar,
    owner_name,
    images,
    favourite_count,
    avarageFavouritePoint,
    comment_conut,
  } = props;
  const onClick = (e: any) => {
    if (e.target === e.currentTarget) {
      console.log("Action when clicking on parent div");
      hide();
    }
  };
  return isShowing ? (
    <Flex
      sx={{
        position: "fixed",
        zIndex: 99,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(248, 242, 242, 0.5)",
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClick}
    >
      <Flex
        direction={"column"}
        style={{
          overflowX: "hidden",
          overflowY: "scroll",
          zIndex: 100,
          width: "50%",
          height: "90%",
          background: "white",
          borderRadius: "9px",
          border: "solid white",
        }}
      >
        <Flex
          sx={{
            backgroundColor: "#FFFFFF",
            height: "5rem",
            zIndex: 102,
            width: "48%",
            position: "fixed",
          }}
          direction={"column"}
          justify={"center"}
          align={'center'}
        >
            <Flex
            justify={'center'}
            align={'center'}
            >
                    <StyledLabel
                    fontSize={"2rem"}
                    color="#000000"
                    title={`Bài viết của ${owner_name}`}
                />
            </Flex>
            <Flex
                onClick={hide}
                justify={'center'}
                align={'center'}
                style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    borderRadius: '50%',
                     right: 0,
                     top: 0,
                     height: '2.5rem',
                     width: '2.5rem',
                     backgroundColor: 'gray'
                    }}
                >
                <FontAwesomeIcon
                cursor={'pointer'}
                 icon={faClose} 
                 />
                </Flex>
          <div
            style={{
              width: "100%",
              opacity: "70%",
              height: "1px",
              backgroundColor: "grey",
            }}
          />
        </Flex>
        <div style={{ marginTop: "5rem" }}>
          <Post
            id={id}
            title={props.title}
            content={props.content}
            owner_id={owner_id}
            story_id={story_id}
            owner_avatar={owner_avatar}
            owner_name={owner_name}
            images={images}
            favourite_count={favourite_count}
            avarageFavouritePoint={avarageFavouritePoint}
            comment_conut={comment_conut}
            favourited={props?.favourited}
            isModal={true}
          />
        </div>
      </Flex>
    </Flex>
  ) : null;
};
