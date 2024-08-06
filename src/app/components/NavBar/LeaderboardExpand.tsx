import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { useState } from "react";

// import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { NavLink } from "react-router-dom";
import { Flex } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { CategoryLI, A, CategoryULDropdown, ListCategory, CategoryWrapper } from "./CategoryExpand";
export const LIST_LEADERBOARD = [
  { id: 1, name: "TOP_ALL", displayName: "Top toàn bộ"},
  { id: 2, name: "TOP_MONTHLY", displayName: "Top tháng" },
  { id: 3, name: "TOP_WEEKLY" , displayName: "Top tuần"},
  { id: 4, name: "TOP_DAILY", displayName: "Top ngày" },
  { id: 5, name: "CHAPTERS", displayName: "Top số chương" },
  // { id: 6, name: "POSTS", displayName: "Top bài viết" },
  { id: 6, name: "VIEWS", displayName: "Top độ nổi tiếng" },
];

interface LeaderboardExpandProps {
  additionStyle?: React.CSSProperties;
  addtionStyleLink?: React.CSSProperties;
}

export const LeaderboardExpand = ({
  additionStyle,
  addtionStyleLink,
}: LeaderboardExpandProps) => {
  return (
    <CategoryLI style={{ ...additionStyle }}>
        <Flex style={{ alignItems: 'center', gap: '4px', justifyContent: 'center', padding: '0 16px'  }}>
        <FontAwesomeIcon icon={faRankingStar} />
        <A to="/" style={{ ...addtionStyleLink }}>
          XẾP HẠNG
        </A>
      </Flex >
      <CategoryULDropdown>
        <ListCategory>
          {LIST_LEADERBOARD.map((category) => (
            <CategoryWrapper
              color="black"
              to={"/tim-truyen/leaderboard/" + category.id}
            >
              {category.displayName}
            </CategoryWrapper>
          ))}
        </ListCategory>
      </CategoryULDropdown>
    </CategoryLI>
  );
};

