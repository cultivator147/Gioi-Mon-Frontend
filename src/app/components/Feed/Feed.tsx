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
import { Alert, Button, Flex, Menu, Select, TextInput } from "@mantine/core";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faAnglesDown,
  faBook,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { IconComponents } from "@tabler/icons-react";
import { IconHash } from "@tabler/icons";
import { useNavigate, useParams } from "react-router-dom";
import useFilterPosts from "../../../hooks/useFilterPost";
const FilterBy = {
  "Tất cả": 0,
  "Top yêu thích": 1,
  "Top bình luận": 2,
};
export const Feed = () => {
  const user = useSelector(getUserSelector);
  const navigate = useNavigate();
  const inputContent = useRef(null);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [files, setFiles] = useState<FileList>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SimpleStoryProps>();
  const { isShowing, toggle } = useModal();
  const [storyId, setStoryId] = useState(null);
  const refFilterBy = useRef<HTMLInputElement>(null);

  const filter_by = useParams().filter_by || "0";
  const fav_status = useParams().fav_status || "0";

  const setFilterByStr = (str: any) => {
    if(str === "0"){
      return  "Tất cả"
      
    }else if(str === "1"){
      return "Top yêu thích";
    }else if(str === "2"){
      return"Top bình luận"
    }else{
      return "Tất cả"
      ;
    }
  }
  const setFavStatusStr = (str: any) => {
    if(str === "0"){
      return  "Tất cả"
    }else if(str === "1"){
      return "Đã thích";
    }else if(str === "2"){
      return"Chưa thích"
    }else{
      return "Tất cả"
      ;
    }
  }
  

  const [filterBy, setFilterBy] = useState<string | null>(setFilterByStr(filter_by));
  const [filterByInt, setFilterByInt] = useState<number>(+filter_by);

  const [favouriteStatusInt, setFavouriteStatusInt] = useState<number>(
    +fav_status
  );
  const [favouriteStatus, setFavouriteStatus] = useState<string | null>(
    setFavStatusStr(fav_status)
  );
  const [sortBy, setSortBy] = useState<string | null>("Tất cả");

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
  const onCompleteFetchFilterPost = (data: any) => {
    setPosts(data);
  };
  const {fetchFilterPosts} = useFilterPosts({
    onComplete: onCompleteFetchFilterPost,
    filterBy: filterByInt,
    favouriteStatus: favouriteStatusInt 
  });
  React.useEffect(() => {
    setPosts([]);
    fetchFilterPosts();
    // const getPost = async () => {
    //   try {
    //     const params: TypeListPost = {
    //       page: 0,
    //       size: 3,
    //       filterBy: filterByInt,
    //       favouriteStatus: favouriteStatusInt,
    //     };
    //     const response = await getListPost(user.token, params);
    //     const data = response?.data?.data;
    //     setPosts(data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // getPost();
  }, [filter_by, fav_status]);
  
  const setFilterInt = (filterByStr: any) => {
    const filterByInt =
      filterByStr === "Tất cả"
        ? FilterBy["Tất cả"]
        : filterByStr === "Top bình luận"
        ? FilterBy["Top bình luận"]
        : FilterBy["Top yêu thích"];
    setFilterByInt(filterByInt);
  };
  const setFavStatusInt = (favStatusStr: any) => {
    const favStatusInt =
      favStatusStr === "Tất cả" ? 0 : favStatusStr === "Đã thích" ? 1 : 2;
    setFavouriteStatusInt(favStatusInt);
  };
  const onClickFilterPost =   () => {
    //  window.location.reload();
     navigate(`/feed/filter_by=${filterByInt}/fav_status=${favouriteStatusInt}`);
  };


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
          <Flex justify={"center"}>
            <SelectButton onClick={onClickSelectStory}>
              <FontAwesomeIcon icon={faBook} style={{ marginRight: "4px" }} />
              {"Chọn truyện"}
            </SelectButton>
            <label className="btn-grad" htmlFor="file-upload">
              <FontAwesomeIcon icon={faImage} style={{ marginRight: "4px" }} />
              Chọn ảnh
              <input
                id="file-upload"
                type="file"
                onChange={handleUploadImage}
                hidden={true}
              />
            </label>
          </Flex>
          <Flex>
            <StyledLink
              href={selectedStory?.link}
              title={postTitle}
              color="#000000"
            />
          </Flex>
          {fileUrls.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "4px",
              }}
            >
              {fileUrls.map((url) => (
                <StyledImage src={url} />
              ))}
            </div>
          )}
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ChooseButton onClick={onClickUpPost}>
              <FontAwesomeIcon
                icon={faAnglesDown}
                style={{ marginRight: "4px" }}
              />
              {"Đăng bài"}
            </ChooseButton>
          </div>
        </UpLoadPost>
        <SearchPost>
          <Flex direction={"column"} sx={{ width: "100%", gap: "10px" }}>
            <Flex justify={"space-between"} sx={{ width: "100%", gap: "10px" }}>
              <Flex>
                <Menu.Label style={{ color: "#000000", fontSize: "1rem" }}>
                  Lọc theo
                </Menu.Label>
                <Select
                  ref={refFilterBy}
                  value={filterBy}
                  onChange={(v) => {setFilterBy(v); setFilterInt(v);}}
                  placeholder="Pick value"
                  data={["Tất cả", "Top yêu thích", "Top bình luận"]}
                  transitionDuration={150}
                  transition="pop-top-left"
                  transitionTimingFunction="ease"
                  icon={<IconHash />}
                />
              </Flex>
              <Flex>
                <Menu.Label style={{ color: "#000000", fontSize: "1rem" }}>
                  Trạng thái
                </Menu.Label>
                <Select
                  value={favouriteStatus}
                  onChange={(v) => {
                    setFavouriteStatus(v);
                    setFavStatusInt(v);
                    ;}}
                  placeholder="Pick value"
                  data={["Tất cả", "Đã thích", "Chưa thích"]}
                  transitionDuration={150}
                  transition="pop-top-left"
                  transitionTimingFunction="ease"
                  icon={<IconHash />}
                />
              </Flex>
            </Flex>
            <Flex>
              <Menu.Label style={{ color: "#000000", fontSize: "1rem" }}>
                Thời gian
              </Menu.Label>
              <Select
                placeholder="Pick value"
                data={["Tất cả", "Tăng dần", "Giảm dần"]}
                value={sortBy}
                onChange={setSortBy}
                icon={<IconComponents />}
              />
            </Flex>
            <Flex justify={"center"} sx={{ width: "100%" }}>
              <Button onClick={onClickFilterPost} variant="light">
                Visit gallery
              </Button>
            </Flex>
          </Flex>
        </SearchPost>
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
const SearchPost = styled.div`
  width: 70%;
  display: flex;
  background-color: white;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-radius: 10px;
  padding: 12px;
  /* height: 5rem; */
`;
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
