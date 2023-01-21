import styled from 'styled-components';
import { messages } from './messages';

export const Main = styled.header`
  align-items: center;
  gap: 1rem;
  display: flex;
  padding: 0.5rem 1rem;
`;

const Arrow = styled.button`
  display: inline-block;
  border: solid gray;
  border-width: 0 2px 2px 0;
  padding: 5px;
  margin: 0 0.5rem;
  background: none;
  cursor: pointer;
`;

export const ArrowLeft = styled(Arrow)`
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;
export const ArrowRight = styled(Arrow)`
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

export const CurrentDate = styled.h2`
  margin-left: 1rem;
  color: gray;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
`;

export const SearchByText = styled.div`
  position: relative;
`;

export const Input = styled.input.attrs({
  type: 'text',
  placeholder: messages.searchPlaceholder,
})`
  padding: 0.5rem;
  border: 1px solid gray;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
`;

export const EventsContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 0.25rem;
`;

export const EventItemStyled = styled.div`
  overflow: hidden;
  padding: 0.25rem;
  margin-right: 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Button = styled.button`
  padding: 0.5rem;
  border: 1px solid;
  border-radius: 0.25rem;
  background: lightyellow;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: darkblue;
    color: #fff;
  }
`;
