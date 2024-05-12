import styled from "styled-components";
import { StyledLabel } from "../Common/StyledLabel";
import { StyledImage } from "../Common/Image";
import { StyledLink } from "../Common/StyledLink";
import { Category } from "../../../api/interfaces/category";
import { Author } from "../../../api/interfaces/author";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPlus,
  faSignal,
  faStar,
  faTags,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faStackpath } from "@fortawesome/free-brands-svg-icons";
import { BackgroundImage, Flex, createStyles } from "@mantine/core";
import { ChooseButton } from "../Common/Button/ChooseButton";
import { ContinueReadingBtn } from "../Common/Button/ContinueReadingBtn";
import { ReadnowButton } from "../Common/Button/ReadnowButton";
import { useNavigate } from "react-router-dom";
import { CreatePostBtn } from "../Common/Button/CreatePostBtn";

export interface MainStoryProps {
  id: any;
  chapters: any;
  title: string;
  picture: string;
  status: any;
  categories: Category[];
  authors: Author[];
  views: any;
}
export const MainStory = (props: MainStoryProps) => {
  const navigate = useNavigate();
  const { id, chapters } = props;
  const { title, picture, status, categories, authors, views } = props;

  return (
    <div style={{ width: '100%', height: '100%'}}>
      <div style={{
        position: 'absolute',
        zIndex: -9999,
        display: 'block',
        backgroundImage: `url(${picture})`,
        width: '100%',
        height: '50%',
        filter: 'blur(30px)',
        WebkitFilter: 'blur(30px)',
        backgroundColor: '#000000',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        opacity: .6,
        overflow: 'hidden'
      }} />
      <Flex
        sx={{
          width: "100%",
          height: '100%',
          alignItems: "center",

        }}
      >
        <Flex
          style={{
            height: "60vh",
            width: "30%",
            padding: "8px",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "10%",
          }}
        >
          <StyledImage src={picture} height={"90%"} width={"70%"} />
        </Flex>
        <Flex direction={"column"} gap={'lg'}>
          <First>
            <StyledLabel
              fontSize={"2em"}
              color="black"
              title={title.toUpperCase()}
            />
          </First>
          <Second>
            <div style={{ width: "100%" }}>
              <Row>
                <div style={{ width: "10em", display: "flex" }}>
                  <div style={{ padding: "4px" }}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                  <StyledLabel
                    fontSize={"1.2em"}
                    color="gray"
                    title="Tên khác"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <StyledLabel fontSize={"1.2em"} color="gray" title={title} />
                </div>
              </Row>
              <Row>
                <div style={{ width: "10em", display: "flex" }}>
                  <div style={{ padding: "4px" }}>
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "start" }}>
                    <StyledLabel
                      fontSize={"1.2em"}
                      color="gray"
                      title="Tác giả"
                    />
                  </div>
                </div>
                <div style={{ display: 'flex' }}>
                  {authors.map((author) => (
                    <div style={{ paddingRight: '6px' }}>
                      <StyledLink
                        fontSize={"1.2em"}
                        title={`${author.name} `}
                        color="blue"
                      />
                    </div>
                  ))}
                </div>
              </Row>
              <Row>
                <div style={{ width: "10em", display: "flex" }}>
                  <div style={{ padding: "4px" }}>
                    <FontAwesomeIcon icon={faSignal} />
                  </div>
                  <StyledLabel
                    fontSize={"1.2em"}
                    color="gray"
                    title="Tình trạng"
                  />
                </div>

                <StyledLabel fontSize={"1.2em"} color="gray" title={status} />
              </Row>
              <Row>
                <div style={{ width: "10em", display: "flex" }}>
                  <div style={{ padding: "4px" }}>
                    <FontAwesomeIcon icon={faTags} />
                  </div>
                  <StyledLabel
                    fontSize={"1.2em"}
                    color="gray"
                    title="Thể loại"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  {categories.map((cate) => (
                    <div style={{ paddingRight: "8px" }}>
                      <StyledLink
                        href={"/tim-truyen/" + cate.id}
                        fontSize={"1.2em"}
                        title={`${cate.name} `}
                        color="blue"
                      />
                    </div>
                  ))}
                </div>
              </Row>
              <Row>
                <div style={{ width: "10em", display: "flex" }}>
                  <div style={{ padding: "4px" }}>
                    <FontAwesomeIcon icon={faEye} />
                  </div>
                  <StyledLabel
                    fontSize={"1.2em"}
                    color="gray"
                    title="Lượt xem"
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "start" }}>
                  <StyledLabel fontSize={"1.2em"} color="gray" title={views} />
                </div>
              </Row>

            </div>
          </Second>
          <Flex>
            <ReadnowButton
              onClick={() => { navigate(`/truyen-tranh/${id}/${chapters[0]?.chapterNumber}`) }}
            >
              {'Đọc ngay'}
            </ReadnowButton>
            <ContinueReadingBtn
              onClick={() => {
                navigate(`/truyen-tranh/${id}/${chapters[chapters.length - 1]?.chapterNumber
                  }`)
              }}
            >
              {`Đọc tiếp - Chapter ${chapters[chapters.length - 1]?.chapterNumber}`}
            </ContinueReadingBtn>
          </Flex>
          <Flex>
            <CreatePostBtn>
              {'Tạo bài viết'}
            </CreatePostBtn>
          </Flex>
        </Flex>
      </Flex>
    </div>

  );
};
const Row = styled.div`
  display: flex;
  justify-content: start;
  padding: 8px;
  gap: 12px;
`;
const First = styled.div`
  padding-left    : 8px;
  display: flex;
  width: 100%;
`;
const Second = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
`;

