import React from 'react';

export const StandardInput = (props:any) =>
  <input
  type={props.type}
  name={props.name}
  value={props.value}
  onChange={props.onChange}/>;
