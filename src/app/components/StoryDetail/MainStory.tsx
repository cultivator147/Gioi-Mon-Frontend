import styled from "styled-components";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { StyledLink } from "../Common/StyledLink";
import { Category } from "../../../api/interfaces/category";
import { Author } from "../../../api/interfaces/author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPlus, faSignal, faStar, faTags, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStackpath } from "@fortawesome/free-brands-svg-icons";

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
                fontSize={"1.6em"}
                color="black"
                title={title.toUpperCase()}
                />
               
            </First>
            <Second>
                <div style={{width: "30%"}}>
                    <StyledImage alt={title} src={picture} width={200} height={250}/>
                </div>
                <div style={{width: "70%", paddingLeft: '24px', }}>
                    <Row> 
                    <div style={{width: '7em', display: 'flex'}}>
                    <div style={{padding: '4px'}}>
                        <FontAwesomeIcon icon={faPlus} />
                        </div>
                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title="Tên khác"
                        />
                        </div>
                        <div style={{display: 'flex', justifyContent:'start'}}>

                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title={title}
                        />
                        </div>

                    </Row>
                    <Row> 
                    <div style={{width: '7em', display: 'flex'}}>
                    <div style={{padding: '4px'}}>
                        <FontAwesomeIcon icon={faUser} />
                        </div>
                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title="Tác giả"
                        />
                        </div>
                        <div style={{display: 'flex', justifyContent:'start'}}>

                        
                         {authors.map((author) => (
                            <StyledLink
                            fontSize={"1.2em"}
                            title={`${author.name} `}
                            color="blue"
                            />
                        ))} 
                        </div>

                    </Row>
                    <Row> 
                    <div style={{width: '7em', display: 'flex'}}>
                    <div style={{padding: '4px'}}>
                        <FontAwesomeIcon icon={faSignal} />
                        </div>
                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title="Tình trạng"
                        />
                        </div>

                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title={status}
                        />
                    </Row>
                    <Row> 
                    <div style={{width: '7em', display: 'flex'}}>
                    <div style={{padding: '4px'}}>
                        <FontAwesomeIcon icon={faTags} />
                        </div>
                        <StyledLabel
                        fontSize={"1.2em"}

                        color="gray"
                        title="Thể loại"
                        />
                        </div>
                        <div style={{display: 'flex', justifyContent:'start'}}>

                        {categories.map((cate) => (
                            <StyledLink
                            href={"/tim-truyen/" + cate.id}
                            fontSize={"1.2em"}
                            title={`${cate.name} ` }
                            color="blue"
                            />
                        ))} 
                        </div>
                        
                    </Row>
                    <Row> 
                    <div style={{width: '7em', display: 'flex'}}>
                        <div style={{padding: '4px'}}>
                        <FontAwesomeIcon icon={faEye} />
                        </div>
                        <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title="Lượt xem"
                        />
                        </div>
                        <div style={{display: 'flex', justifyContent:'start'}}>

                         <StyledLabel
                        fontSize={"1.2em"}
                        color="gray"
                        title={views}
                        />
                        </div>

                    </Row>
                </div>
            </Second>
        </Wrapper>
    );
};
const Row = styled.div`
    display: flex;
    justify-content: start;
    padding: 8px;
    gap: 12px;
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
    gap: 12px;
`;
