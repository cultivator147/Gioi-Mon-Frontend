import styled from "styled-components";
export const Search = () => {
  return (
    <>
      <Input placeholder="Tìm truyện..."></Input>
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
  height: 12px;
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
