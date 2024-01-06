import styled from "styled-components";
import { StyledImage } from "../../Common/Image";

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
      <a href={link}>
        <StyledImage
          src={picture}
          width={180}
          height={200}
          onClick={() => {
            console.log("Cliked Story!");
          }}
        />
      </a>
    </ItemWrapper>
  );
};
