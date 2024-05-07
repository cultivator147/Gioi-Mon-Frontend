import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import FriendProfileScreen from "./FriendProfile";

export const FriendProfilePage = () => {
    return (
      <Wrapper>
        <FriendProfileScreen />
      </Wrapper>
    );
  };
  const Wrapper = styled(PageWrapper)`
    flex-direction: column;
  `;