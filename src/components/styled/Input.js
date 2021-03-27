import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #3333;
  margin: 4px 0;
  border-radius: 0;
  background: #8881;
  height: 36px;
  font-size: 24px;
  transition: border-bottom .2s ease;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`

export default Input;
