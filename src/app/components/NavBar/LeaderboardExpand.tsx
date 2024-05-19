import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { useState } from "react";

// import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { NavLink } from "react-router-dom";
import { Flex } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { CategoryLI, A, CategoryULDropdown, ListCategory, CategoryWrapper } from "./CategoryExpand";
const LIST_LEADERBOARD = [
  { id: 1, name: "TOP_ALL" },
  { id: 2, name: "TOP_MONTHLY" },
  { id: 3, name: "TOP_WEEKLY" },
  { id: 4, name: "TOP_DAILY" },
  { id: 5, name: "TOP_FOLLOW" },
  { id: 6, name: "FULL" },
  { id: 7, name: "FAVOURITE" },
  { id: 8, name: "LAST_UPDATE" },
  { id: 9, name: "NEW" },
  { id: 10, name: "CHAPTERS" },
];

interface LeaderboardExpandProps {
  additionStyle?: React.CSSProperties;
  addtionStyleLink?: React.CSSProperties;
}

export const LeaderboardExpand = ({
  additionStyle,
  addtionStyleLink,
}: LeaderboardExpandProps) => {
  const [listLeaderboard, setlistLeaderboard] = useState(LIST_LEADERBOARD);
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
          {listLeaderboard.map((category) => (
            <CategoryWrapper
              color="black"
              to={"/tim-truyen/leaderboard/" + category.id}
            >
              {category.name}
            </CategoryWrapper>
          ))}
        </ListCategory>
      </CategoryULDropdown>
    </CategoryLI>
  );
};

