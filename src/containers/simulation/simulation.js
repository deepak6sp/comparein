import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import {getSimulatedPremiumWins} from '../../actions/simulation';
import { VictoryTooltip, VictoryStack, VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryBar, VictoryAxis } from 'victory';

class Simulation extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.getPremiumWins();
      this.props.getSimulatedPremiumWins();
    }

    _handleSelectedBrand(name) {
      //this.props.generateAgeWinsApi(name);
      window.location = '/brand-specific/'+name;
    }

    render() {

        if(this.props.newSummary.length != 0) {
          let numberOfWins = [];
          let brandNames = [];
          let numberOfDisplayBars = [];
          let premium = [];

          this.props.newSummary[0].forEach((ele,i) => {
            brandNames.push(ele.brand);
            numberOfDisplayBars.push(i++);
            numberOfWins.push({'brand':ele.brand,'wins':ele.wins, label: "wins "+ele.wins});
            premium.push({'brand':ele.brand,'premium':ele.premium});
          })

          let simulatedNumberOfWins = [];
          let simulatedBrandNames = [];
          let simulatedNumberOfDisplayBars = [];

          if(this.props.simulationDetails.length != 0) {

            this.props.simulationDetails[0].forEach((ele,i) => {
              simulatedBrandNames.push(ele.brand);
              simulatedNumberOfDisplayBars.push(i++);
              simulatedNumberOfWins.push({'brand':ele.brand,'wins':ele.wins, label:  "wins "+ele.wins});
            })
          }

          return (
            <main className='market-summary-page'>
              <div className='market-summary-wrapper'>
                <section className='graph-container'>
                  <h2>Before Simulation</h2>
                  <VictoryChart animate={{ delay: 0, duration: 500, easing: "bounce" }}>
                    <VictoryAxis
                      tickValues={numberOfDisplayBars}
                      tickFormat={brandNames}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(x) => (`${x}`)}
                    />

                      <VictoryBar
                          style={{
                            data: { fill: "#4DB6AC", width: 40 }
                          }}
                          labelComponent={<VictoryTooltip/>}
                          data={numberOfWins}
                          x="brand"
                          y="wins"
                          events={[{
                            target: "data",
                            eventHandlers: {
                              onClick: () => {
                                return [{
                                  mutation: (props) => {
                                    this._handleSelectedBrand(props.datum.brand);
                                  }
                                }];
                              },
                              onMouseEnter: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#1f4b47"})}
                                  }
                                }];
                              },
                              onMouseLeave: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#4DB6AC"})}
                                  }
                                }];
                              }
                            }
                          }]} />
                     
                  </VictoryChart>

                  <h2>After Simulation</h2>
                  <VictoryChart  animate={{ delay: 0, duration: 500, easing: "bounce" }}>
                  
                    <VictoryAxis
                      tickValues={numberOfDisplayBars}
                      tickFormat={brandNames}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(x) => (`${x}`)}
                    />
                      <VictoryBar
                          style={{
                            data: { fill: "#4DB6AC", width: 40 }
                          }}
                          labelComponent={<VictoryTooltip/>}
                          data={numberOfWins}
                          x="brand"
                          y="wins"
                          events={[{
                            target: "data",
                            eventHandlers: {
                              onClick: () => {
                                return [{
                                  mutation: (props) => {
                                    this._handleSelectedBrand(props.datum.brand);
                                  }
                                }];
                              },
                              onMouseEnter: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#1f4b47"})}
                                  }
                                }];
                              },
                              onMouseLeave: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#4DB6AC"})}
                                  }
                                }];
                              }
                            }
                          }]} />

                          <VictoryBar
                          style={{
                            data: { width: 40, stroke: "#000000", strokeWidth: 3, fillOpacity:0.1 }
                          }}
                          labelComponent={<VictoryTooltip/>}
                          data={simulatedNumberOfWins}
                          x="brand"
                          y="wins"
                          events={[{
                            target: "data",
                            eventHandlers: {
                              onClick: () => {
                                return [{
                                  mutation: (props) => {
                                    this._handleSelectedBrand(props.datum.brand);
                                  }
                                }];
                              },
                              onMouseEnter: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#1f4b47"})}
                                  }
                                }];
                              },
                              onMouseLeave: () => {
                                return [{
                                  mutation: (props) => {
                                    return {style: Object.assign(props.style, {fill: "#4DB6AC"})}
                                  }
                                }];
                              }
                            }
                          }]} />
                  </VictoryChart>
                </section>
              </div>
            </main>
          );
        } else {
          return <div>Wait....</div>
        }
    }
}


/**
 * This will retrieve the state which will be available as props
 * as this.props.newText in the component
 * @param  {array} state array retrieved from reducer
 * @return {Object}      Object retrived from new state
 */
const matchStateToProps = state => ({
  newSummary: state.newSummary,
  simulationDetails: state.simulationDetails
});


/**
 * This will dispatch new value to actions from the
 * component as this.props.submitText
 * @param  {Dispatch} dispatch redux dispatcher
 * @return {Function}          submitText is the function located in Actions
 */
const matchDispatchToProps = dispatch =>
    bindActionCreators({getPremiumWins, getSimulatedPremiumWins}, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(Simulation);
