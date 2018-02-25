import React, {Component} from 'react';


const GraphSelectionSliders = (props) => (
    <section className="sliders-wrapper">
      <div className="switchcontainer">
        <div className="onoffswitch">

            <input
              value={props.switchStatus}
              onChange = {props.handleSwitch}
              type="checkbox"
              className="onoffswitch-checkbox"
              id={props.switchId} defaultChecked />

            <label className="onoffswitch-label" htmlFor={props.switchId}>
                <span className="onoffswitch-inner"></span>
                <span className="onoffswitch-switch"></span>
            </label>
        </div>
      </div>

      {
        props.showRankSlider &&
        <div className="rangeSlidecontainer">
          <input type="range" min="1" max="3" value={props.rank} className="slider" onChange={props.handleRankChange}/>
          <span className="range-slider__value">Rank {props.rank}</span>
        </div>
      }

    </section>

      );

// Bind actions, states and component to the store
export default GraphSelectionSliders;
