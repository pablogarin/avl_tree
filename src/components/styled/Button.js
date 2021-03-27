import styled from 'styled-components';

const Button = styled.button`
  background: #0AB;
  color: #fffE;
  padding: 12px 16px;
  border: 1px solid #3333;
  border-radius: 6px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 700;
  position: relative;
  &:hover:before {
    display: block;
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #6663;
  }
`

export default Button;
