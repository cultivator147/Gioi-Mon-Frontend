import styled from "styled-components";
import { PageWrapper } from "../../components/PageWrapper";
import ProfileScreen from "./ProfileScreen";

export const ProfilePage = () => {
    return (
      <Wrapper>
        <ProfileScreen />
      </Wrapper>
    );
  };
  const Wrapper = styled(PageWrapper)`
    flex-direction: column;
  `;