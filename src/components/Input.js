import React, { forwardRef } from 'react';
import {Container, Input as CustomInput, Label} from './styled/Input';

const Input = forwardRef((props, ref) => (
  <Container error={props.error}>
    <CustomInput ref={ref} {...props} />
    <Label>{props.label}</Label>
  </Container>
))

export default Input;
