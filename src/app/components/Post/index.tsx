import styled from "styled-components";
import { StyledImage } from "../Common/Image";
import { StyledLabel } from "../Common/StyledLabel";
export interface PostProps{
    owner_id: any,
    owner_avatar: string,
    owner_name: string,
    title?: string,
    content?: string,
    images: string[],
}
export const Post = (props: PostProps) => {
    return(
        <PostWrapper>
            <div style={{display: 'flex'}}>
                <div 
                style={{padding: '8px'}}>
                    <StyledImage
                        src={
                            props.owner_avatar
                        }
                        width={50}
                        height={50}
                    />
                </div>
                <div 
                style={{display: 'flex', flexDirection: 'column', padding: '4px'}}>
                    <StyledLabel title={props.owner_name} fontSize={'1.2rem'}  color="#0"/>
                    <StyledLabel title="4h" fontSize={'1.1rem'} color="#0"/>
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

            <PostFooter />
        </PostWrapper>
    );
};
const PostWrapper = styled.div`
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
    height: 60%;
    padding-left: 4px;
    padding-top: 16px;
    padding-bottom: 16px;
    padding-right: 4px;
`;
const PostFooter = styled.div`
`;