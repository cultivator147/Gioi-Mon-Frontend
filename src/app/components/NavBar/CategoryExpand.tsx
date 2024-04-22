import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import React, { useState, useEffect } from "react";
import { Logger } from "../../../utils/helper";
import { getAllCategories } from "../../../api/modules/stories/category";
import { Category } from "../../../api/interfaces/category";
import { NavLink } from "react-router-dom";
import { Flex } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClockRotateLeft, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

interface CategoryExpandProps {
  additionStyle?: React.CSSProperties;
  addtionStyleLink?: React.CSSProperties;
}

export const CategoryExpand = ({
  additionStyle,
  addtionStyleLink,
}: CategoryExpandProps) => {
  // const dispatch = useAppDispatch();
  // const currentCategoryID = useAppSelector((state) => state.category.id);
  // const handleOnClickCategory = (id:any, name:any) => {
  //   dispatch(update({id: id, title: name}));
  // }
  const [listCategory, setListCategory] = useState<Category[]>([]);
  const getAll = async () => {
    try {
      const response = await getAllCategories();
      setListCategory(response.data?.data);
    } catch (err) {
      Logger(err);
    }
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <CategoryLI style={{ width: "15%", ...additionStyle }}>
          <Flex sx={{alignItems:'center', gap: '4px', justifyContent: 'center'}}>
          <FontAwesomeIcon icon={faLayerGroup} />
      <A to="/" style={{ ...addtionStyleLink }}>
        Thể loại
      </A>
      </Flex>
      <CategoryULDropdown>
        <ListCategory>
          {listCategory.map((category) => (
            <CategoryWrapper
              key={category.id}
              to={"/tim-truyen/" + category.id}
              color="#000000"
            >
              {category.name}
            </CategoryWrapper>
          ))}
        </ListCategory>
      </CategoryULDropdown>
    </CategoryLI>
  );
};
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
const A = styled(NavLink)`
  font-weight: 450;
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

export const CategoryWrapper = styled(NavLink)`
  text-decoration: none;
  cursor: pointer;
  padding: 6px;
  &:hover {
    background-color: green;
  }
`;
const ListCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`;
