import styled from "styled-components";
import { StyledImage } from "../Common/Image";
import { StyledLabel } from "../Common/StyledLabel";
import { Link } from "react-router-dom";
import { StyledButton } from "../Common/StyledButton";
export interface PostProps{
    owner_id: any,
    story_id: any,
    owner_avatar: string,
    owner_name: string,
    title?: string,
    content?: string,
    images: string[],
}
export const Post = (props: PostProps) => {
    const onClickInterest = () => {
        
    }
    return(
        <PostWrapper>
            <div style={{display: 'flex'}}>
                <div style={{display: 'flex', width: '60%', padding: '4px'}}>
                    <div 
                    style={{padding: '8px'}}
                    >
                        <StyledImage
                            src={
                                props.owner_avatar
                            }
                            width={50}
                            height={50}
                        />
                    </div>
                    <div 
                    style={{display: 'flex', flexDirection: 'column'}}>
                        <StyledLabel title={props.owner_name} fontSize={'1.2rem'}  color="#0"/>
                        <StyledLabel title="4h" fontSize={'1.1rem'} color="#0"/>
                    </div>
                </div>
                
                <div style={{width: '40%', padding: '8px', display: 'flex', alignContent: 'center', justifyContent: 'flex-end'}}>
                            <Link style={{width: '50%'}} to={"/truyen-tranh/" + props.story_id}>
                                <div style=
                                {{borderStyle: 'solid', borderWidth: '2px',
                                  width:'100%',height: '75%', borderColor: 'green',
                                  justifyContent: 'center', display: 'flex', 
                                  alignItems: 'center', cursor: 'pointer'}}>
                                <label style={{color: 'red', cursor: 'pointer'}}> {"Đọc ngay"}</label>
                                </div>
                            </Link>
                        
                </div>
            </div>
            
            <PostBody>
                <div>
                    {props.title}
                </div>
                <div>
                    {props.content}
                </div>
                <div>
                    {props?.images?.map((img) => (
                        <StyledImage src={img} width={200} height={200} />
                    ))}
                </div>
            </PostBody>

            <PostFooter >
                <StyledButton backgroundColor="#ffffff" label={"Quan tâm"} onClick={onClickInterest}/>
                <StyledButton backgroundColor="#ffffff" label={"Bình luận"} />
                <StyledButton backgroundColor="#ffffff" label={"Chia sẻ"} />
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
`;