import styled from "styled-components/macro";
import { StyleConstants } from "../../../styles/StyleConstants";
import { Brand } from "./Brand";
import { Search } from "./Search";
import { StyledLink } from "../Common/StyledLink";
import { PageWrapper, SubWrapperRow } from "../PageWrapper";
export const Header = () => {
  return (
    <Wrapper>
      <SubWrapperRow>
        <First>
          <Brand />
        </First>
        <Center>
          <Search />
        </Center>
        <End>
          <StyledLink
            fontSize={StyleConstants.FONT_SIZE_SMALL}
            color="#21231D"
            afterContent="/"
            title="Đăng nhập"
            underline = {false}
            href="/"
          />
          <StyledLink fontSize={StyleConstants.FONT_SIZE_SMALL} color="#21231D" title="Đăng ký" href="/" underline = {false}/>
        </End>
      </SubWrapperRow>
    </Wrapper>
  );
};
const Wrapper = styled(PageWrapper)`
  background-color: ${StyleConstants.BACKGROUND_HEADER_COLOR};
  ${SubWrapperRow} {
    padding: 4px 8px;
    justify-content: space-between;
  }
`;

const First = styled.div`
  flex: 0.2;
`;
const Center = styled.div`
  display: flex;
  flex: 0.5;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;
const End = styled.div`
  display: flex;
  flex: 0.3;
  justify-content: center;
`;
