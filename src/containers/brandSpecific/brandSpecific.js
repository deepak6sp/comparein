
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateAgeQtesWinsApi, getAgeQtesWins} from '../../actions/brandSpecific';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

import UI from '../../components/ui';
import PopUp from '../../components/ui/popup';

class BrandSpecific extends Component {

    constructor(props) {
        super(props);
        this.numberOfQuotes = [];
        this.numberOfWins = [];
        this.XaxisDisplayText = [];
        this.numberOfDisplayBars = [];
        this.quotedPremium = [];
    }

    componentDidMount() {
      this.props.generateAgeQtesWinsApi(this.props.brandName);
      this.props.getAgeQtesWins(this.props.brandName);
    }

    render() {
      if(this.props.brandSpecificDetails.length > 0) {
        let i = 0;
        this.props.brandSpecificDetails[0].map(ele => {

          if(ele.rank == 1) {
            this.numberOfQuotes.push({"count": ++i, "quotes": ele.quotes});
            this.numberOfWins.push({"count": i, "wins": ele.wins});
            this.quotedPremium.push({"count": i, "quotedPremium": ele.asp});
            this.XaxisDisplayText.push(ele.ageBand);
            this.numberOfDisplayBars.push(i);
          }

        });
      }

      console.log(this.numberOfQuotes);
      console.log(this.numberOfWins);
      console.log(this.quotedPremium);
      console.log(this.XaxisDisplayText);
      console.log(this.numberOfDisplayBars);

      return (
        <main className='brand-specific-page'>
          <h3>{this.props.brandName}</h3>
          <div className='brand-specific-wrapper'>
            <section className='graph-container'>

              <VictoryChart
                domainPadding={30}
                animate={{ delay: 0, duration: 500, easing: "bounce" }}
                theme={VictoryTheme.material}
                width = {600}
              >
                <VictoryAxis
                  tickValues={this.numberOfDisplayBars}
                  tickFormat={this.XaxisDisplayText}
                />

                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => (`${x}`)} />

                <VictoryBar
                  style={{
                    data: { fill: "#1f4b47", width: 40 }
                  }}
                  data={this.numberOfQuotes}
                  x="count"
                  y="quotes" />

                <VictoryBar
                   style={{
                     data: { fill: "#4DB6AC", width: 40 }
                   }}
                   data={this.numberOfWins}
                   x="count"
                   y="wins" />

               <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" },
                  }}
                  data={this.quotedPremium}
                  x="count"
                  y="quotedPremium" />

                <VictoryScatter
                  labels={(d) => `$${d.y}`}
                  style={{
                    data: { fill: "#000000" },
                  }}
                  data={this.quotedPremium}
                  x="count"
                  y="quotedPremium" />


              </VictoryChart>
              <div className='graph-label-desc'>
                <div className="red">Quoted Premium</div>
                <div className="green-dark">Number Of Quotes</div>
                <div className="green-primary">Number Of Wins</div>
              </div>
            </section>
          </div>
        </main>
      );
    }
}


/**
 * This will retrieve the state which will be available as props
 * as this.props.newText in the component
 * @param  {array} state array retrieved from reducer
 * @return {Object}      Object retrived from new state
 */
const matchStateToProps = state => ({brandSpecificDetails: state.brandSpecificDetails});


/**
 * This will dispatch new value to actions from the
 * component as this.props.submitText
 * @param  {Dispatch} dispatch redux dispatcher
 * @return {Function}          submitText is the function located in Actions
 */
const matchDispatchToProps = dispatch =>
    bindActionCreators({generateAgeQtesWinsApi, getAgeQtesWins}, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(BrandSpecific);
