import styled from "styled-components";
import { StyleConstants } from "../../../styles/StyleConstants";
import React, { useState } from "react";
import { Logger } from "../../../utils/helper";
import { getAllCategories } from "../../../api/modules/stories/category";
import { Category } from "../../../api/interfaces/category";

export const CategoryExpand = () => {
  // const dispatch = useAppDispatch();
  // const currentCategoryID = useAppSelector((state) => state.category.id);
  // const handleOnClickCategory = (id:any, name:any) => {
  //   dispatch(update({id: id, title: name}));
  // }
  const [listCategory, setListCategory] = useState<Category[]>([]);
  React.useEffect(() => {
    const  getAll = async () => {
      try{
        const response = await getAllCategories();
        setListCategory(response.data?.data);
      }catch(err){
        Logger(err);
      }
    }
    getAll();
    },[]);
    return (
        <CategoryLI style={{ width: "20%" }}>
          <A href="/">Thể loại</A>
          <CategoryULDropdown>
            <ListCategory>
            {listCategory.map((category) => (
              <CategoryWrapper
              href={"/tim-truyen/" + category.id} 
              color="#000000"
              >
                {category.name}
              </CategoryWrapper>
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

export const CategoryWrapper = styled.a`
    text-decoration: none;
    cursor: pointer;
    padding: 6px;
    &:hover{
        background-color: green;
    }
`;
const ListCategory = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
`;
