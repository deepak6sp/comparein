import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

import UI from '../../components/ui';
import PopUp from '../../components/ui/popup';

class MarketSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            openPopUp: true
        };
    }

    componentDidMount() {
      this.props.getPremiumWins();
    }

    _handlePopUpClose() {
      this.setState({openPopUp: false});
    }

    _handleSelectedBrand(name) {
      console.log(name);
      //this.props.generateAgeWinsApi(name);
      window.location = '/brand-specific/'+name;
    }

    render() {

      if(!this.state.openPopUp) {
        if(this.props.newSummary.length != 0) {
          let data = [];
          let brandNames = [];
          let count = [];

          this.props.newSummary[0].forEach((ele,i) => {
            brandNames.push(ele.brand);
            count.push(i+1);
            data.push({'brand':ele.brand,'wins':ele.wins})
          })

          return (
            <main className='market-summary-page'>
              <div className='market-summary-wrapper'>
                <section className='graph-container'>
                  <VictoryChart domainPadding={30} animate={{ delay: 0, duration: 500, easing: "bounce" }}>
                    <VictoryAxis
                      tickValues={count}
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
                        data = {data}
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
        }
      } else {
        return (
          <main className='market-summary-page'>
            <form id='state-and-product'>
              <PopUp handlePopUpClose={this._handlePopUpClose.bind(this)}>

                  <section className='select-state'>
                    <h4>Select state</h4>
                  </section>

                  <section className='select-product'>
                    <h4>Select Product</h4>
                    <div className='input-group'>
                      <input id="home" name="home" type="checkbox" className="hidden"/>
                      <label htmlFor="home">Home and Content</label>

                      <input id="car" name="car" type="checkbox" className="hidden"/>
                      <label htmlFor="car">Car</label>
                    </div>
                  </section>

              </PopUp>
            </form>
          </main>
        );
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
