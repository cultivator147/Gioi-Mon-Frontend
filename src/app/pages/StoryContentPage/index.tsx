import styled from "styled-components";
import { PageWrapper} from "../../components/PageWrapper";
import { StoryContent } from "../../components/StoryContent";
import Footer from "../../components/Footer/Footer";

export const StoryContentPage = () => {
  return (
    <Wrapper>
      <StoryContent />
      <Footer />
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
    flex-direction: column;
`;


