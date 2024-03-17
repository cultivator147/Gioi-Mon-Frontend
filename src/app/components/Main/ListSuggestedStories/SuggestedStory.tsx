import styled from "styled-components";
import { StyledImage } from "../../Common/Image";
import { NavLink } from "react-router-dom";

export interface SuggestedStoryProps {
  picture: string;
  title: string;
  link: string;
}
export const SuggestedStory = (props: SuggestedStoryProps) => {
  const { picture, title, link } = props;
  const ItemWrapper = styled.div`
    padding: 10px;
    transition: transform 0.3s ease;
  `;
  return (
    <ItemWrapper>
      <NavLink to={link}>
        <StyledImage
          src={picture}
          width={180}
          height={200}
          onClick={() => {
            console.log("Cliked Story!");
          }}
        />
      </NavLink>
    </ItemWrapper>
  );
};
