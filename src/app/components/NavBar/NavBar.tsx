import styled from "styled-components";
import { SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { CategoryExpand } from "./CategoryExpand";
import { LeaderboardExpand } from "./LeaderboardExpand";

export const NavBar = () => {
  return (
    <Wrapper>
      <ULWrappper>
        <div style={{width: '80%'}}>

        <LI style={{ width: "20%" }}>
          <A href="/">Home</A>
        </LI>
        
        <LI style={{ width: "20%" }}>
          <A href="/">Đề cử</A>
        </LI>
        <CategoryExpand/>
        <LeaderboardExpand/>
        {/* <CategoryLI style={{ width: "20%" }}>
          <A href="/">Xếp hạng</A>
          <CategoryULDropdown></CategoryULDropdown>
        </CategoryLI> */}
      </div>

      </ULWrappper>

    </Wrapper>
  );
};


 const A = styled.a`
  display: block;
  color: #333;
  line-height: ${StyleConstants.NAV_BAR_HEIGHT};
  text-decoration: none;
  text-transform: uppercase;
`;
 const LI = styled.li`
  text-align: center;
  float: left;
  border-right: 1px solid #ddd;
  list-style: none;
  display: block;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    background-color: white;
    ${A} {
      color: red;
    }
  }
`;

const Wrapper = styled(SubWrapperRow)`
  ${SubWrapperRow} {
    padding: 0;
  }
`;
const ULWrappper = styled.ul`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 2;
  list-style: none;
  height: 100%;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 40px;
`;


