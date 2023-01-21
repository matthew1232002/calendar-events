import styled from 'styled-components';

export const Main = styled.div`
  flex-direction: column;
  display: flex;
  border-top: 1px solid grey;
  border-right: 1px solid grey;
`;

export const DayHeader = styled.div`
  align-items: center;
  flex-direction: column;
  display: flex;
`;

export const DayName = styled.div`
  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;
export const DayNum = styled.div`
  padding: 0.25rem;
  margin: 0.25rem 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
`;

export const EventsContainer = styled.div`
  overflow-y: auto;
  flex: 1;
  height: 100px;
  cursor: pointer;
`;

export const EvtItem = styled.div<{ bgColor: string }>`
  overflow: hidden;
  padding: 0.25rem;
  margin-right: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  background-color: ${({ bgColor }) => bgColor};
  color: black;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
