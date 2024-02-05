import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
export const Search = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword]= useState('');

  const onClickSearch = () => {
  navigate(`/tim-truyen/keyword=${keyword}`);
  window.location.reload();
  }
  return (
    <>
      <Input 
      placeholder="Tìm truyện..."
      onChange={(e) => {setKeyword(e.target.value)}}
      />

      <Button
        type="submit"
        onClick={() => {
          console.log("clicked");
        }}
        onSubmit={() => {
          console.log("hehe");
        }}
      >
        <SearchIcon
          onClick={onClickSearch}
          src="https://img.icons8.com/ios-glyphs/30/search--v1.png"
          alt="Search Icon"
        ></SearchIcon>
      </Button>
    </>
  );
};

const Input = styled.input`
  width: 80%;
  padding: 10px;
  border: 0px solid #ccc;
  font-size: 16px;
  height: 32px;
`;
const Button = styled.button`
  background-color: #ffffff;
  border: 0px solid #ccc;
  width: 40px;
  height: 32px;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }

  &:active {
    opacity: 0.4;
  }
`;
const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;
