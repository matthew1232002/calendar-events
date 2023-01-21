import styled from 'styled-components';

export const Main = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  grid-template-rows: repeat(5, minmax(0, 1fr));
  border-bottom: 1px solid grey;
  border-left: 1px solid grey;
`;
