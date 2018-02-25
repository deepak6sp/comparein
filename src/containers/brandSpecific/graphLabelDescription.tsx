import React, {Component} from 'react';

const GraphLabelDescription = (props) => (
  <section className='graph-label-desc'>
    {props.redLabel && <div className="red">{props.redLabel}</div> }
    {props.greenDarkLabel && <div className="green-dark">{props.greenDarkLabel}</div> }
    {props.greenPrimarylabel && <div className="green-primary">{props.greenPrimarylabel}</div> }
  </section>
);

// Bind actions, states and component to the store
export default GraphLabelDescription;
