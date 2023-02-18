import styled from 'styled-components';

const Button = styled.button`
  align-self: center;
  background: #fef8d8;
  text-transform: uppercase;
  color: #000;
  font-family: "Concert One", cursive;
  border-radius: 10px;
  padding: 10px;
  font-size: 18px;
  width: 10em;
  margin-bottom: 1em;
  border: solid ${(props) => (props ? props.border : '#000')} 3px;
  animation: ${(props) => props.animation} 2s ease;

  @media (min-width: 768px) {
    margin-bottom: 0;
    &:hover {
      background-color: #45413c;
      color: #fef8d8;
      cursor: ${(props) => props.cursor};
    }
  }
`;

export default Button;
