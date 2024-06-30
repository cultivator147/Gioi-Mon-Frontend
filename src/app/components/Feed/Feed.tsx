import styled from "styled-components";
import { PageWrapper, SubWrapperColumn, SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import React, { useRef, useState } from "react";
import { ListPost } from "./ListPost";
import { TypeListPost } from "../../../api/interfaces/listPost";
import { getListPost } from "../../../api/modules/post/listPost";
import { StyledImage } from "../Common/Image";
import { useSelector } from "react-redux";
import { getProfileSelector, getUserSelector } from "../../../redux-toolkit/slice/userSlice/selector";
import { Alert, Button, Flex, LoadingOverlay, Menu, Modal, Select, Text, TextInput, Textarea, Avatar } from "@mantine/core";
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
import useDetailStory from "../../../hooks/useDetailStory";
import { PostProps } from "./Post";
import { delay } from "../../../utils/helper";
import { StyledAvatar } from "../Common/Image/StyledAvatar";
const FilterBy = {
  "Tất cả": 0,
  "Top yêu thích": 1,
  "Top bình luận": 2,
};
export const Feed = ({props} : any) => {
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
  const refFilterBy = useRef<HTMLInputElement>(null);
  const [opened, setOpened] = useState(false);
  const profile = useSelector(getProfileSelector);
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
  const setSortByStr = (str: any) => {
    if(str === "0"){
      return  "Tất cả"
    }else if(str === "1"){
      return "Giảm dần";
    }else if(str === "2"){
      return"Tăng dần"
    }else{
      return "Tất cả"
      ;
    }
  }
  const story_id = useParams().story_id || "0";
  const filter_by = useParams().filter_by || "0";
  const fav_status = useParams().fav_status || "0";
  const sort_by = useParams().sort_by || "0";

  const [filterBy, setFilterBy] = useState<string | null>(setFilterByStr(filter_by));
  const [filterByInt, setFilterByInt] = useState<number>(+filter_by);

  const [favouriteStatusInt, setFavouriteStatusInt] = useState<number>(+fav_status);
  const [favouriteStatus, setFavouriteStatus] = useState<string | null>(setFavStatusStr(fav_status));

   const [sortByInt, setSortByInt] = useState<number>(+sort_by);
  const [sortBy, setSortBy] = useState<string | null>(setSortByStr(sort_by));

  const [storyId, setStoryId] = useState(+story_id);
  const [storyName, setStoryName] = useState(null);

  const [openAlert, setOpenAlert] = useState(false);
  const onCompleteSelectStory = (str: SimpleStoryProps) => {
    setSelectedStory(str);
    setPostTitle(str.title);
    setFileUrls([...fileUrls, str?.picture]);
  };
  const onConfirmUpPost = async () => {
    setLoading(true);
    await createPost(user?.token, {
      storyId: selectedStory?.id,
      title: selectedStory?.title,
      content: postContent,
      images: fileUrls,
    });
    await delay(3000);
    // window.location.reload();
    setOpened(false);

    // setPosts([...posts, {
    //   id: undefined,
    //   owner_id: undefined,
    //   story_id: undefined,
    //   owner_avatar: "",
    //   owner_name: "",
    //   images: [],
    //   favourite_count: undefined,
    //   avarageFavouritePoint: undefined,
    //   comment_conut: undefined,
    //   favourited: 0,
    //   favourited_point: undefined
    // }])
    setFileUrls([]);
    setPostTitle("");
    setPostContent("");
    setPosts([]);
    fetchFilterPosts();
    setLoading(false);
  }
  const onClickSelectStory = () => {
    toggle();
  };
  const onClickUpPost = async () => {
    if(selectedStory == undefined){
      setOpenAlert(true);
      return;
    }
    setOpened(true);
  };
  const onCompleteFetchFilterPost = (data: any) => {
    setPosts(data);
  };
  const {fetchFilterPosts} = useFilterPosts({
    onComplete: onCompleteFetchFilterPost,
    filterBy: filterByInt,
    favouriteStatus: favouriteStatusInt ,
    sortBy: sortByInt,
    storyId: storyId,
  });
  React.useEffect(() => {
    setPosts([]);
    if(storyId != null){
      getDataDetailStory();
    }
    fetchFilterPosts();
  
  }, [filter_by, fav_status, sort_by]);
  
  const setFilterInt = (filterByStr: any) => {
    const filterByInt =
      filterByStr === "Tất cả"
        ? FilterBy["Tất cả"]
        : filterByStr === "Top bình luận"
        ? FilterBy["Top bình luận"]
        : FilterBy["Top yêu thích"];
    setFilterByInt(filterByInt);
  };
  const convertToSortByInt = (sortByStr: any) => {
    const favStatusInt =
    sortByStr === "Tất cả" ? 0 : sortByStr === "Giảm dần" ? 1 : 2;
    setSortByInt(favStatusInt);
  };
  const setFavStatusInt = (favStatusStr: any) => {
    const favStatusInt =
      favStatusStr === "Tất cả" ? 0 : favStatusStr === "Đã thích" ? 1 : 2;
    setFavouriteStatusInt(favStatusInt);
  };
  const onClickFilterPost =   () => {
    //  window.location.reload();
     navigate(`/feed/filter_by=${filterByInt}/fav_status=${favouriteStatusInt}/sort_by=${sortByInt}/story_id=${storyId}`);
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

  const onCompleteGetDetailStory = (data: any) => {
    const {
      title,
    } = data;
   setStoryName(title);
  };
  const { getDataDetailStory } = useDetailStory({
    onComplete: onCompleteGetDetailStory,
    storyId: storyId,
  });
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
        <LoadingOverlay   loaderProps={{ size: 'xl'}} visible={loading} overlayBlur={2}/>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <StyledAvatar height={50} width={50} src={profile?.avatar} />
            {/* <StyledImage
              src={
                profile?.avatar
              }
              isAvatar={true}
              width={50}
              height={50}
            /> */}
            
            <div style={{ display: "flex", width: "100%" }}>
            <Textarea
                placeholder="Xin chào, bạn đang yêu thích câu truyện nào?"
                ref={inputContent}
                autosize
                minRows={2}
                onChange={(event) => setPostContent(event.currentTarget.value)}
                style={{width: '100%'}}
              />
              {/* <TextInput
                onChange={(event) => setPostContent(event.currentTarget.value)}
                ref={inputContent}
                style={{ width: "100%" }}
                placeholder="Xin chào, bạn đang yêu thích câu truyện nào?"
              /> */}
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
          <Modal
          size={"lg"}
        centered
        opened={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Bạn phải chọn một truyện để viết bài"
      >
        <Flex gap={'12px'} justify={'center'} sx={{width: '100%'}}>
          <Button
          variant="gradient" gradient={{ from: 'orange', to: 'red' }}
          onClick={() => {setOpenAlert(false)}}
          >
            {'Xác nhận'}
          </Button>
          </Flex>
          </Modal>

          <Modal
          size={"lg"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Bạn có chắc muốn đăng bài, sẽ bị trừ 10 Xu?"
      >
        <Flex gap={'12px'} justify={'center'} sx={{width: '100%'}}>
          <Button
          variant="gradient" gradient={{ from: 'orange', to: 'red' }}
          onClick={onConfirmUpPost}
          >
            {'Xác nhận'}
          </Button>

          <Button
          onClick={() => {setOpened(false)}}
          >
            {'Huỷ'}
          </Button>
          </Flex>
          </Modal>
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
                onChange={(v) => {setSortBy(v); convertToSortByInt(v);}}
                icon={<IconComponents />}
              />
            </Flex>
            {storyName != null && (<Flex align={'center'}>
              <Menu.Label style={{ color: "#000000", fontSize: "1rem" }}>
                Truyện:
              </Menu.Label>
              <Text
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
                sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
                ta="center"
                fz="xl"
                fw={700}
                align="center"
                >
              {storyName}
            </Text>
            </Flex>)}
            
            <Flex justify={"center"} sx={{ width: "100%" }}>
              <Button variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }} onClick={onClickFilterPost}>
                Tìm bài đăng
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
