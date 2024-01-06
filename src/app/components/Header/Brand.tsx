import styled from "styled-components/macro";
export const Brand = () => {
  return (
    <Wrapper>
      <Title href = "/">
      <Image src="https://i.ibb.co/tYVBQ1F/brand-img.png" alt="brand-img" />
      </Title>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.a`
  align-items: center;
  display: flex;
  font-size: 2rem;
  color: #d57da0;
  font-weight: bold;
`;
const Image = styled.img`
    width: 150px;
`;
