import React from 'react';

export const StandardInput = props =>
  <input
  type={props.type}
  name={props.name}
  value={props.value}
  onChange={props.onChange}/>;
