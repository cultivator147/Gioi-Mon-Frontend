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
import { Alert, TextInput } from "@mantine/core";
import { StyledButton } from "../Common/StyledButton";
import { uploadImage } from "../../../utils/imageUploader";
import { createPost } from "../../../api/modules/post/post";

export const Feed = () => {
  const user = useSelector(getUserSelector);
  const inputContent = useRef(null);
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [files, setFiles] = useState<FileList>();
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const onClickUpPost = async () => {
    console.log(postContent);
    console.log(fileUrls);
    await createPost(user?.token,{storyId: 1, content: postContent, images: fileUrls}); 
    window.location.reload();
  }
  
  React.useEffect(() => {
    const getPost = async () => {
      try{
        const params : TypeListPost = {page: 0, size: 7};
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
  }, [posts]);
   const  handleUploadImage = async (e: any) => {
    setLoading(true);
    if(!e.target.files)return; 
    setFiles(e.target.files); 
    const uri: string = await uploadImage(e.target.files[0]);
    console.log('uri ', uri);
    if(uri){
      setFileUrls([...fileUrls, uri]);
    }else{
      console.log('no file uploaded...');
    }
    setLoading(false);
  }
  return (
    <Wrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          backgroundColor: StyleConstants.BACKGROUND_MAIN_COLOR,
          justifyItems: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        <UpLoadPost>
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '8px'}}>
            <StyledImage src={"https://i.pinimg.com/564x/0e/67/ab/0e67abe3de05cc36baad2ff2e4ea6464.jpg"} width={50} height={50} />
            <div style={{display: 'flex', width: '100%'}}>
            <TextInput
            onChange={(event) => setPostContent(event.currentTarget.value)}
            ref={inputContent}
            style={{width: '100%'}}
            placeholder="Xin chào, bạn đang yêu thích câu truyện nào?"/>
            </div>

          </div>
          <div style={{display: 'flex'}}>
            <label htmlFor="file-upload" 
            style=
            {{
              display:
             'inline-block',
              padding: '10px 20px',
               cursor: 'pointer',
                backgroundColor: '#fca311',
                color: '#ffffff',
                borderRadius: '5px',
                border: 'none',
                transition: 'background-color 0.3s'
                }}>
              Chọn ảnh
              <input id="file-upload" type="file" onChange={handleUploadImage} hidden = {true} />
            </label>
          </div>
          {(fileUrls.length > 0) && (
            <div>
              {fileUrls.map((url) => (
                <StyledImage src={url} width={250} height={250} />
              ))}
            </div>
          )}
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <StyledButton label={"Đăng"} backgroundColor="#ffffff" onClick={onClickUpPost}/>
          </div>
        </UpLoadPost>
        <div 
          style={{display: 'flex', width: '70%', alignContent: 'center', flexDirection: 'column', justifyItems: 'center', gap: '20px'}}>
          <ListPost 
          listItems={posts}
          />
          
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
