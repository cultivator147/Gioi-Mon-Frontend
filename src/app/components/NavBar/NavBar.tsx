import styled from "styled-components";
import { SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { CategoryExpand } from "./CategoryExpand";
import { LeaderboardExpand } from "./LeaderboardExpand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";

export const NavBar = () => {
  const location = useLocation();

  const activeBackgroundTab = (path: string) => {
    if (path === "/") {
      if (location.pathname === "/") {
        return { opacity: "0.8", backgroundColor: "white" };
      }
    } else {
      const regex = new RegExp(path);
      if (location.pathname.match(regex)) {
        return { opacity: "0.8", backgroundColor: "white" };
      }
    }
    return {};
  };

  const activeLinkTab = (path: string) => {
    if (path === "/") {
      if (location.pathname === "/") {
        return { color: "red" };
      }
    } else {
      const regex = new RegExp(path);
      if (location.pathname.match(regex)) {
        return { color: "red" };
      }
    }
    return {};
  };

  return (
    <Wrapper>
      <ULWrappper>
        <div style={{ width: "80%" }}>
          <LI style={{ width: "20%", ...activeBackgroundTab("/") }}>
            <A style={activeLinkTab("/")} to="/">
              Home
            </A>
          </LI>

          <LI style={{ width: "10%" }}>
            <A to="/de-cu">Đề cử</A>
          </LI>
          <LI style={{ width: "10%" }}>
            <A to="/theo-doi">Theo dõi</A>
          </LI>
          <LI style={{ width: "10%" }}>
            <A to="/">Lịch sử</A>
          </LI>
          <CategoryExpand
            additionStyle={activeBackgroundTab("^/tim-truyen/(\\d+)$")}
            addtionStyleLink={activeLinkTab("^/tim-truyen/(\\d+)$")}
          />
          <LeaderboardExpand
            additionStyle={activeBackgroundTab(
              "^/tim-truyen/leaderboard/(\\d+)$"
            )}
            addtionStyleLink={activeLinkTab("^/tim-truyen/leaderboard/(\\d+)$")}
          />
          {/* <CategoryLI style={{ width: "20%" }}>
          <A href="/">Xếp hạng</A>
          <CategoryULDropdown></CategoryULDropdown>
        </CategoryLI> */}
        </div>
      </ULWrappper>
    </Wrapper>
  );
};

const A = styled(NavLink)`
  display: block;
  color: #000000;
  font-weight: 450;

  line-height: ${StyleConstants.NAV_BAR_HEIGHT};
  text-decoration: none;
  text-transform: uppercase;
`;
const LI = styled.li`
  text-align: center;
  float: left;
  border-right: 2px solid #ddd;
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
