import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import React, { useRef, useState } from "react";
import { ListPost } from "./ListPost";
import { TypeListPost } from "../../../api/interfaces/listPost";
import { getListPost } from "../../../api/modules/post/listPost";
import { StyledImage } from "../Common/Image";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { Alert, Flex, TextInput } from "@mantine/core";
import { StyledButton } from "../Common/Button/StyledButton";
import { uploadImage } from "../../../utils/imageUploader";
import { createPost } from "../../../api/modules/post/post";
import SelectStoryModal from "../Modal/SelectStoryModal";
import useModal from "../Modal/useModal";
import { SimpleStoryProps } from "../Main/ListStoriesHome/StoryHome";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledLink } from "../Common/StyledLink";
import { SelectButton } from "../Common/Button/SelectButton";
import { ChooseButton } from "../Common/Button/ChooseButton";

export const Feed = () => {
  const user = useSelector(getUserSelector);
  const inputContent = useRef(null);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [files, setFiles] = useState<FileList>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedStory, setSelectedStory] = useState<SimpleStoryProps>();
  const { isShowing, toggle } = useModal();

  const onCompleteSelectStory = (str: SimpleStoryProps) => {
    setSelectedStory(str);
    setPostTitle(str.title);
    setFileUrls([...fileUrls, str?.picture]);
  };

  const onClickSelectStory = () => {
    toggle();
  };
  const onClickUpPost = async () => {
    await createPost(user?.token, {
      storyId: selectedStory?.id,
      title: selectedStory?.title,
      content: postContent,
      images: fileUrls,
    });
    window.location.reload();
  };

  React.useEffect(() => {
    const getPost = async () => {
      try {
        const params: TypeListPost = { page: 0, size: 7 };
        const response = await getListPost(user.token, params);
        const data = response?.data?.data;
        setPosts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);

  const handleUploadImage = async (e: any) => {
    setLoading(true);
    if (!e.target.files) return;
    setFiles(e.target.files);
    const uri: string = await uploadImage(e.target.files[0]);
    console.log("uri ", uri);
    if (uri) {
      setFileUrls([...fileUrls, uri]);
    } else {
      console.log("no file uploaded...");
    }
    setLoading(false);
  };
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "70%",
          backgroundColor: "#ece7e7",
          justifyItems: "center",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <UpLoadPost>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <StyledImage
              src={
                "https://i.pinimg.com/564x/0e/67/ab/0e67abe3de05cc36baad2ff2e4ea6464.jpg"
              }
              width={50}
              height={50}
            />
            <div style={{ display: "flex", width: "100%" }}>
              <TextInput
                onChange={(event) => setPostContent(event.currentTarget.value)}
                ref={inputContent}
                style={{ width: "100%" }}
                placeholder="Xin chào, bạn đang yêu thích câu truyện nào?"
              />
            </div>
          </div>
          <SelectStoryModal
            isShowing={isShowing}
            hide={toggle}
            onCompleteSelectStory={onCompleteSelectStory}
          />
          <div style={{ display: "flex" }}>
            <SelectButton
            onClick={onClickSelectStory}
            >
              {'Chọn truyện'}
            </SelectButton>
            <label
            className="btn-grad"
            htmlFor="file-upload"
            >
              Chọn ảnh
              <input
                id="file-upload"
                type="file"
                onChange={handleUploadImage}
                hidden={true}
              />
            </label>
          </div>
          <Flex
          >
            <StyledLink href={selectedStory?.link}  title={postTitle} color="#000000"/>
          </Flex>
          {fileUrls.length > 0 && (
            <div>
              {fileUrls.map((url) => (
                <StyledImage src={url} width={250} height={250} />
              ))}
            </div>
          )}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center"}}
          >
            <ChooseButton
            onClick={onClickUpPost}
            >
              {'Đăng bài'}
            </ChooseButton>
          </div>
        </UpLoadPost>
        <div
          style={{
            display: "flex",
            width: "70%",
            alignContent: "center",
            flexDirection: "column",
            justifyItems: "center",
            gap: "20px",
          }}
        >
          <ListPost listItems={posts} />
        </div>
      </div>
    </Wrapper>
  );
};
const UpLoadPost = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-radius: 10px;
  padding: 12px;
`;

const Wrapper = styled(PageWrapper)`
  padding: 12px;
  justify-content: center;
  flex: 1;
  background-color: #ece7e7;
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
    background-color: #ece7e7;
    justify-content: start;
    align-items: start;
  }
`;
