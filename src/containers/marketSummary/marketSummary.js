import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const Plot = createPlotlyComponent(Plotly);
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

import UI from '../../components/ui';

class MarketSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: ''
        };
    }

    componentDidMount() {
      this.props.getPremiumWins();
    }

    render() {
      console.log(this.props.newSummary.length);
      console.log(this.props.newSummary);

      if(this.props.newSummary.length != 0) {
        let data = [];
        let brandNames = [];
        let count = [];
        this.props.newSummary[0].forEach((ele,i) => {
          brandNames.push(ele.brand);
          count.push(i+1);
          data.push({'brand':i+1,'wins':ele.wins})
        })

        return (
          <main className='market-summary-page'>
            <div className='market-summary-wrapper'>
              <section className='graph-container'>
                <VictoryChart domainPadding={20} animate={{ delay: 0, duration: 500, easing: "bounce" }}>
                  <VictoryAxis
                    tickValues={count}
                    tickFormat={brandNames}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x}`)}
                  />
                  <VictoryBar
                      data = {data}
                      x="brand"
                      y="wins"/>
                </VictoryChart>
              </section>
              <section className='market-summary-text'>
                <h3>Market Summary</h3>
                <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                </p>
              </section>
            </div>
          </main>
        );
      } else {
        return <h1> No graph data </h1>
      }
    }
}


/**
 * This will retrieve the state which will be available as props
 * as this.props.newText in the component
 * @param  {array} state array retrieved from reducer
 * @return {Object}      Object retrived from new state
 */
const matchStateToProps = state => ({newSummary: state.newSummary});


/**
 * This will dispatch new value to actions from the
 * component as this.props.submitText
 * @param  {Dispatch} dispatch redux dispatcher
 * @return {Function}          submitText is the function located in Actions
 */
const matchDispatchToProps = dispatch =>
    bindActionCreators({getPremiumWins}, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(MarketSummary);
