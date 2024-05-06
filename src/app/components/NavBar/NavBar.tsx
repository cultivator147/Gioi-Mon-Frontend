import styled from "styled-components";
import { SubWrapperRow } from "../PageWrapper";
import { StyleConstants } from "../../../styles/StyleConstants";
import { CategoryExpand } from "./CategoryExpand";
import { LeaderboardExpand } from "./LeaderboardExpand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBlog, faBookJournalWhills, faClockRotateLeft, faHeartCircleCheck, faHome, faTags } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { Flex } from "@mantine/core";
import { useEffect, useState } from "react";

export const NavBar = () => {

  const [showDiv, setShowDiv] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setShowDiv(windowWidth > 825); // Thay đổi giá trị 500 thành mức nhỏ nhất định của chiều rộng
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


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
  const LabelStyle = {
    fontFamily: "Nunito Sans, SF Pro Text, SF Pro Icons, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif",
  };
  return (
    <Wrapper>
      {showDiv &&
        <ULWrappper>
          <Flex justify={'center'} style={{ width: "100%" }}>
            <LI style={{ ...activeBackgroundTab("/") }}>
              <Flex sx={{ alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faBookJournalWhills} />
                <A style={activeLinkTab("/")} to="/">
                  Trang chủ
                </A>
              </Flex>

            </LI>
            <LI style={{}}>
              <Flex sx={{ alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faBlog} />
                <A style={activeLinkTab("/feed")} to="/feed">
                  Bài đăng
                </A>
              </Flex>

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
            <LI style={{}}>
              <Flex sx={{ alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faHeartCircleCheck} />
                <A to="/theo-doi">Đang theo dõi</A>
              </Flex>
            </LI>
            <LI style={{}}>
              <Flex sx={{ alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faClockRotateLeft} />
                <A to="/theo-doi">Đang đọc</A>
              </Flex>
            </LI>



          </Flex>
        </ULWrappper>
      }
    </Wrapper>

  );
};

const A = styled(NavLink)`
  display: block;
  color: #000000;
  font-weight: 450;

  line-height: ${StyleConstants.NAV_BAR_HEIGHT};
  text-decoration: none;
  font-family: Nunito Sans, SF Pro Text, SF Pro Icons, Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
`;
const LI = styled.li`
  text-align: center;
  float: left;
  border-right: 2px solid #ddd;
  list-style: none;
  display: block;
  cursor: pointer;
  padding: 0 16px;
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
const ULWrappper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 2;
  list-style: none;
  height: 100%;
  margin-block-start: 1em;
  margin-block-end: 1em;
`;
