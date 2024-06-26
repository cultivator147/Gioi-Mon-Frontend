import styled from "styled-components";
import { StyledImage } from "../../../Common/Image";
import { StyledLink } from "../../../Common/StyledLink";
import { SimpleStoryProps } from "../../ListStoriesHome/StoryHome";
import { StyledLabel } from "../../../Common/StyledLabel";
import { NavLink } from "react-router-dom";

export const HistoryStory = (props: any) => {
  console.log("props:::::::");
  console.log(props);
  const { link, title, picture, chapterNumber } = props;
  return (
    <Wrapper>
      <NavLink to={link}>
        <StyledImage src={picture} width={70} height={70} />
      </NavLink>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: "8px",
          width: "60%",
        }}
      >
        <StyledLink title={title} href={link} fontSize={"16px"} color="black" />
        <StyledLink
          fontSize={"14px"}
          color="gray"
          title={`Đọc tiếp chap ${chapterNumber} >`}
          href={`truyen-tranh/${props.id}/${chapterNumber}`}
        />
      </div>
      <div>
        <StyledLink
          italic={true}
          color="black"
          fontSize={"14px"}
          title={"Xoá"}
        />
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 4px;
`;
