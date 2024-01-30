import styled from "styled-components";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { StyledLink } from "../Common/StyledLink";
import { Category } from "../../../api/interfaces/category";
import { Author } from "../../../api/interfaces/author";

export interface MainStoryProps{
    title: string,
    picture: string,
    status: any,
    categories: Category[],
    authors: Author[],
    views: any,
}
export const MainStory = (props: MainStoryProps) => {
  const {title, picture, status, categories, authors, views} = props;
    return (
        <Wrapper>
            <First>
                <StyledLabel
                color="black"
                title={title}
                />
               
            </First>
            <Second>
                <div style={{width: "30%"}}>
                    <StyledImage alt={title} src={picture} width={200} height={250}/>
                </div>
                <div style={{width: "70%"}}>
                    <Row> 
                        <StyledLabel
                        color="gray"
                        title="Tên khác"
                        />
                        <StyledLabel
                        color="gray"
                        title={title}
                        />
                    </Row>
                    <Row> 
                        <StyledLabel
                        color="gray"
                        title="Tác giả"
                        />
                         {authors.map((author) => (
                            <StyledLink
                            title={`${author.name} - `}
                            color="blue"
                            />
                        ))} 
                    </Row>
                    <Row> 
                        <StyledLabel
                        color="gray"
                        title="Tình trạng"
                        />
                        <StyledLabel
                        color="gray"
                        title={status}
                        />
                    </Row>
                    <Row> 
                        <StyledLabel
                        color="gray"
                        title="Thể loại"
                        />
                        <div>
                        {categories.map((cate) => (
                            <StyledLink
                            title={`${cate.name} - `}
                            color="blue"
                            />
                        ))} 
                        </div>
                        
                    </Row>
                    <Row> 
                        <StyledLabel
                        color="gray"
                        title="Lượt xem"
                        />
                         <StyledLabel
                        color="gray"
                        title={views}
                        />
                    </Row>
                </div>
            </Second>
        </Wrapper>
    );
};
const Row = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px;
`;
const First = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`;
const Second = styled.div`
    width: 100%;
    display:flex;
    flex-direction : row;
    flex: 1;
    padding: 12px;
    width:100%;
`;
const Wrapper = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
