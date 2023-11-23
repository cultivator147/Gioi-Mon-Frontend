import styled from "styled-components/macro";

export const PageWrapper = styled.div`
  flex: 1;
  box-sizing: border-box;
  display: flex;
`;
export const SubWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 4px 8px;
  margin-left: 20%;
  margin-right: 20%;
  align-items: center;
  flex: 1;
`;
export const SubWrapperRow = styled(SubWrapper)`
  flex-direction: row;
`;
export const SubWrapperColumn = styled(SubWrapper)`
    flex-direction: column;
`;

