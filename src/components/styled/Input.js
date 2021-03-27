import styled, { keyframes } from 'styled-components';

const focused = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0.5;
    font-size: 7pt;
    top: 0;
    left: 0;
    transform: translate(0%, -100%);
  }
`;

const blur = keyframes`
  from {
    opacity: 0.5;
    font-size: 7pt;
    top: 0;
    left: 0;
    transform: translate(0%, -100%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`;

export const Container = styled.div`
  display: block;
  position: relative;
  margin: 16px 0;
  animation-fill-mode: forwards;
  & > input:focus ~ label {
    animation: ${focused} .1s linear forwards;
  }
  & > input:not(:focus) ~ label {
    animation: ${blur} .1s linear forwards;
  }
  &:before {
    display: ${props => !!props.error ? 'block' : 'none'};
    position: absolute;
    color: #C44;
    content: "${props => props.error}";
    font-size: 12px;
    bottom: -14px;
    left: 0;
    font-weight: 700;
  }
`;

export const Input = styled.input`
  border: none;
  border-bottom: 1px solid #3333;
  border-radius: 0;
  background: #8881;
  height: 36px;
  width: 100%;
  font-size: 24px;
  transition: border-bottom .2s ease;
  position: relative;
  z-index: 2;
  &:focus {
    outline: none;
    border-bottom: 1px solid #333;
  }
`;

export const Label = styled.label`
  position: absolute;
  font-size: 14pt;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  transition: all 0.1s ease;
`;
