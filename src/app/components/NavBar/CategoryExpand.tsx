import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import { useState } from "react";

import {update, add} from '../../../redux-toolkit/categorySlice'
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { Logger } from "../../../utils/helper";
const LIST_CATEGORY = [
  {id: 1, name: "ACTION"},
  {id: 2, name: "ADULT"},
  {id: 3, name: "ADVENTURE"},
  {id: 4, name: "ANIME"},
  {id: 5, name: "Chuyển sinh"},
  {id: 6, name: "COMEDY"},
  {id: 7, name: "COMIC"},
  {id: 8, name: "COOKING"},
  {id: 9, name: "Cổ đại"},
  {id: 10, name: "Doujinshi"},
  {id: 11, name: "Drama"},
  {id: 12, name: "Đam mỹ"},
  {id: 13, name: "Ecchi"},
  {id: 14, name: "Fantasy"},
  {id: 15, name: "Gender Bender"},
  {id: 16, name: "Harem"},
];

export const CategoryExpand = () => {
  // const dispatch = useAppDispatch();
  // const currentCategoryID = useAppSelector((state) => state.category.id);
  // const handleOnClickCategory = (id:any, name:any) => {
  //   dispatch(update({id: id, title: name}));
  // }
  const [listCategory, setListCategory] = useState(LIST_CATEGORY);
    return (
        <CategoryLI style={{ width: "20%" }}>
          <A href="/">Thể loại</A>
          <CategoryULDropdown>
            <ListCategory>
            {listCategory.map((category) => (
              <Category>
                <a 
                color="black"
                href={"/tim-truyen/" + category.id} 
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
  width: 40rem;
  min-width: 20rem;
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
