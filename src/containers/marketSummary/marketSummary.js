import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js/dist/plotly-cartesian';
const Plot = createPlotlyComponent(Plotly);

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
      if(this.props.newSummary.length != 0) {
        let resultX=[];
        let resultY=[];
        this.props.newSummary[0].forEach((ele,i) => {
          resultX.push(ele.brand);
          resultY.push(ele.wins);
        });
        return (
          <main className='market-summary-page'>
              <Plot
                  data={[{x: resultX, y: resultY, type: 'bar'}]}
              />
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
