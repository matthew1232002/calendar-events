import styled from 'styled-components';
import { messages } from './messages';

export const Main = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  width: 100%;
`;

export const Form = styled.form`
  width: 25%;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
  background: white;
`;
export const ModalHeader = styled.div`
  align-items: center;
  justify-content: flex-end;
  display: flex;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem 0.5rem 0 0;
  background: lightgrey;
`;
export const Controllers = styled.div`
  display: flex;
  gap: 10px;
`;
export const ModalBtn = styled.button`
  border: 1px solid;
  border-radius: 0.25rem;
  background: grey;
  cursor: pointer;
`;

export const Info = styled.div`
  padding: 1rem;
`;
export const InfoContent = styled.div`
  align-items: flex-end;
  display: grid;
  row-gap: 1.75rem;
`;
export const EvtDate = styled.p`
  font-size: 1.5rem;
`;
export const InputStyled = styled.input.attrs({
  type: 'text',
  name: 'description',
  placeholder: messages.titlePlaceholder,
  required: true,
})`
  padding: 10px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 0.25rem;
  outline: none;
`;
export const Footer = styled.footer`
  margin: 0 1rem 1rem 0;
  text-align: end;
`;
export const SaveBtn = styled(ModalBtn)`
  padding: 0.25rem 1rem;
`;
