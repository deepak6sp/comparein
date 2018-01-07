
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateAgeWinsApi, getAgeWins} from '../../actions/brandSpecific';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

import UI from '../../components/ui';
import PopUp from '../../components/ui/popup';

class BrandSpecific extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
      this.props.generateAgeWinsApi(this.props.brandName);
      this.props.getAgeWins(this.props.brandName);
    }

    render() {
      console.log(this.props.brandSpecificDetails);
      let numberOfQuotes = [];
      let numberOfWins = [];
      let XaxisDisplayText = [];
      let numberOfDisplayBars = [];
      let quotedPremium = [];
      if(this.props.brandSpecificDetails.length > 0) {
        this.props.brandSpecificDetails[0].map((ele, i) => {
          numberOfQuotes.push({"count": ++i, "quotes": ele.quotes});
          numberOfWins.push({"count": i, "wins": ele.wins});
          quotedPremium.push({"count": i, "quotedPremium": ele.quotedPremium});
          XaxisDisplayText.push(ele.ageBand);
          numberOfDisplayBars.push(i);
        });
      }

      return (
        <main className='brand-specific-page'>
          <div className='brand-specific-wrapper'>
            <section className='graph-container'>
              <VictoryChart
                domainPadding={30}
                animate={{ delay: 0, duration: 500, easing: "bounce" }}
                theme={VictoryTheme.material}
                width = {600}
              >
                <VictoryAxis
                  tickValues={numberOfDisplayBars}
                  tickFormat={XaxisDisplayText}
                />

                <VictoryAxis
                  dependentAxis
                    tickFormat={(x) => (`${x}`)}
                />
                <VictoryGroup>

                  <VictoryStack>
                    <VictoryBar
                      style={{
                        data: { fill: "#1f4b47", width: 40 }
                      }}
                      data={numberOfQuotes}
                      x="count"
                      y="quotes"
                    />

                    <VictoryBar
                      style={{
                        data: { fill: "#4DB6AC", width: 40 }
                      }}
                      data={numberOfWins}
                      x="count"
                      y="wins"
                    />
                  </VictoryStack>
                  <VictoryLine
                    style={{
                      data: { stroke: "#c43a31" },
                    }}
                    data={quotedPremium}
                    x="count"
                    y="quotedPremium"
                  />
                  <VictoryScatter
                    style={{
                      data: { fill: "#000000" },
                    }}
                    data={quotedPremium}
                    x="count"
                    y="quotedPremium"
                  />
                </VictoryGroup>
              </VictoryChart>
              <div className='graph-label-desc'>
                <div className="red">Quoted Premium</div>
                <div className="green-primary">Number Of Quotes</div>
                <div className="green-dark">Number Of Wins</div>
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
    bindActionCreators({generateAgeWinsApi, getAgeWins}, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(BrandSpecific);
