import styled from "styled-components";
import { PageWrapper} from "../../components/PageWrapper";
import { StoryContent } from "../../components/StoryContent";

export const StoryContentPage = () => {
  return (
    <Wrapper>
      <StoryContent />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


