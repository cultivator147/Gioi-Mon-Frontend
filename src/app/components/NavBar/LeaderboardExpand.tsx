import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { useState } from "react";

import {update, add} from '../../../redux-toolkit/categorySlice'
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { Logger } from "../../../utils/helper";
const LIST_LEADERBOARD = [
  {id: 1, name: "TOP_ALL"},
  {id: 2, name: "TOP_MONTHLY"},
  {id: 3, name: "TOP_WEEKLY"},
  {id: 4, name: "TOP_DAILY"},
  {id: 5, name: "TOP_FOLLOW"},
  {id: 6, name: "FULL"},
  {id: 7, name: "FAVOURITE"},
  {id: 8, name: "LAST_UPDATE"},
  {id: 9, name: "NEW"},
  {id: 10, name: "CHAPTERS"},
];

export const LeaderboardExpand = () => {
  const [listLeaderboard, setlistLeaderboard] = useState(LIST_LEADERBOARD);
    return (
        <CategoryLI style={{ width: "30%" }}>
          <A href="/">XẾP HẠNG</A>
          <CategoryULDropdown>
            <ListCategory>
            {listLeaderboard.map((category) => (
              <Category>
                <a 
                style={{textDecoration: "none"}}
                color="black"
                href={"/tim-truyen/leaderboard/" + category.id} 
                >
                      {category.name}
                </a>
              </Category>
            ))}
              
            </ListCategory>
          </CategoryULDropdown>
        </CategoryLI>
    );
}
const CategoryULDropdown = styled.div`
  background-color: white;
  float: left;
  width: 20rem;
  min-width: 10rem;
  position: absolute;
  top: 100%;
  z-index: 1000;
  list-style: none;
  display: none;
  cursor: default;
`;
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
    background-color: white;
    ${A} {
      color: red;
    }
  }
`;

const CategoryLI = styled(LI)`
  &:hover {
    text-decoration: none;
    ${CategoryULDropdown} {
      display: block;
    }
  }
`;

const Category = styled.div`
    padding: 6px;
    &:hover{
        background-color: green;
    }
`;
const ListCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`;
