import { Flex, TextInput } from "@mantine/core";
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { StyledButton } from "../Common/Button/StyledButton";
import useFilteredListStories, {
  IUseFilteredListStories,
} from "../../../hooks/useFilteredListStories";
import { SimpleStoryProps } from "../Main/ListStoriesHome/StoryHome";
import { ChooseButton } from "../Common/Button/ChooseButton";
import { SelectButton } from "../Common/Button/SelectButton";
import { SearchButton } from "../Common/Button/SearchButton";
import { faClose, faImage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadImage } from "../../../utils/imageUploader";
import { Link } from "react-router-dom";
import { createPost } from "../../../api/modules/post/post";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";

const CrPostFrStrModal = ({ isShowing, hide, props }: any) => {
  const { id, title, picture, status, categories, authors, views } = props;
  const inputContent = useRef(null);
  const [postContent, setPostContent] = useState("");
  const [fileUrls, setFileUrls] = useState<string[]>([picture]);
  const user = useSelector(getUserSelector);

  const [loading, setLoading] = useState(false);
  const handleUploadImage = async (e: any) => {
    setLoading(true);
    if (!e.target.files) return;
    const uri: string = await uploadImage(e.target.files[0]);
    console.log("uri ", uri);
    if (uri) {
      setFileUrls([...fileUrls, uri]);
    } else {
      console.log("no file uploaded...");
    }
    setLoading(false);
  };


  const handleCreatePost = async () => {
    await createPost(user?.token, {
        storyId: id,
        title: title,
        content: postContent,
        images: fileUrls,
      });
      window.location.reload();
  }
  return isShowing ? (
    <Flex
      style={{
        position: "fixed",
        zIndex: 99,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        left: 0,
        top: 0,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          height: "80%",
          background: "white",
          borderRadius: "9px",
          border: "solid white",
          overflowY: "scroll",
        }}
      >
        <Flex direction={"column"} style={{ height: "88%" }}>
          <Flex
            justify={"center"}
            align={"center"}
            style={{ marginBottom: "1rem", marginTop: "0.5rem" }}
          >
            <StyledLabel
              fontSize={"2rem"}
              color="#000000"
              title={`Tạo bài viết`}
            />
            
          </Flex>
          <Flex justify={'center'} style={{width: '100%'}}>
            <Flex justify={'center'} style={{width: '80%'}}>
            <Link to={`/truyen-tranh/${props.story_id}`}>
                <text className="gradient-text">{props.title}</text>
            </Link>
          </Flex>
          </Flex>

          <div style={{ display: "flex", width: "100%" }}>
            <TextInput
              onChange={(event) => setPostContent(event.currentTarget.value)}
              ref={inputContent}
              style={{ width: "100%" }}
              placeholder={`Nói gì đó về truyện ${title}`}
            />
          </div>
          <Flex justify={"center"} style={{ margin: "1rem" }}>
            <label className="btn-grad" htmlFor="file-upload">
              <FontAwesomeIcon icon={faImage} style={{ marginRight: "4px" }} />
              Thêm ảnh
              <input
                id="file-upload"
                type="file"
                onChange={handleUploadImage}
                hidden={true}
              />
            </label>
          </Flex>

          {fileUrls.length > 0 && (
            <Flex justify={'center'}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                gap: "4px",
              }}
            >
              {fileUrls.map((url) => (
                <StyledImage src={url} />
              ))}
            </div>
            </Flex>

          )}

          <Flex
            align={"center"}
            justify={"center"}
            style={{
              zIndex: 99,
              width: "100%",
              borderTop: "1px solid #e5e5e5",
              padding: "16px",
            }}
          >
            <button
              className="btn-choose"
              onClick={() => {
                hide();
                handleCreatePost();
              }}
            >
              {"Đăng bài viết"}
            </button>
            <button
                    className='btn-closed'
                     onClick={hide}>
                        {'Đóng'}
                    </button>
          </Flex>
        </Flex>
      </div>
    </Flex>
  ) : null;
};

export default CrPostFrStrModal;
