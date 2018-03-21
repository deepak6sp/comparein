import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import { VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryBar, VictoryAxis } from 'victory';

class Simulation extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
      this.props.getPremiumWins();
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
            numberOfWins.push({'brand':ele.brand,'wins':ele.wins});
            premium.push({'brand':ele.brand,'premium':ele.premium});
          })

          console.log(premium);
        

          return (
            <main className='market-summary-page'>
              <div className='market-summary-wrapper'>
                <section className='graph-container'>
                  <VictoryChart domainPadding={30} animate={{ delay: 0, duration: 500, easing: "bounce" }}>
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
                      <VictoryLine
                        style={{
                          data: { stroke: "#c43a31" },
                        }}
                        data={premium}
                        x="brand"
                        y="premium"
                      />
                      <VictoryScatter
                        style={{
                          data: { stroke: "#c43a31" },
                        }}
                        data={premium}
                        x="brand"
                        y="premium"
                      />
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
export default connect(matchStateToProps, matchDispatchToProps)(Simulation);
