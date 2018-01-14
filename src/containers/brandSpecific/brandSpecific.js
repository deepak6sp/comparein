
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateAgeQtesWinsApi, getAgeQtesWins, getAgeBandRel, generateAgeBandRelApi} from '../../actions/brandSpecific';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

import UI from '../../components/ui';
import AgeQtesWins from './ageQtesWins.js';

class BrandSpecific extends Component {

    constructor(props) {
        super(props);

        this.state = {
          ageBasedRank: 1,
          ageBasedSwitchStatus: "off"
        };
    }

    componentDidMount() {
      this.props.generateAgeQtesWinsApi(this.props.brandName);
      this.props.getAgeQtesWins(this.props.brandName);
      this.props.generateAgeBandRelApi(this.props.brandName);
      this.props.getAgeBandRel(this.props.brandName);
    }

    _handleAgeBasedRankChange(e) {
      console.log(e.target.value);
      this.setState({ageBasedRank: e.target.value});
    }
    _handleAgeBasedSwitch(e) {
      console.log(e.target.value);
      if(e.target.value == "off") {
        this.setState({ageBasedSwitchStatus: 'on'});
        console.log("called generateAgeBandRelApi");

      } else {
        this.setState({ageBasedSwitchStatus: 'off'});
      }
    }

    render() {
      let numberOfQuotes = [];
      let numberOfWins = [];
      let XaxisDisplayText = [];
      let numberOfDisplayBars = [];
      let quotedPremium = [];
      let relativityPremium = [];
      let quotedPremiumOrRelativityValue = [];
      let YquotedPremiumOrRelativityText;
      console.log(this.props.brandSpecificDetails);
      if(this.props.brandSpecificDetails.length > 1) {
        let i=0, j=0;
        this.props.brandSpecificDetails[0].map(ele => {
          if(ele.rank == this.state.ageBasedRank) {
            numberOfQuotes.push({"count": ++i, "quotes": ele.quotes});
            numberOfWins.push({"count": i, "wins": ele.wins});
            quotedPremium.push({"count": i, "quotedPremium": ele.asp});
            XaxisDisplayText.push(ele.ageBand);
            numberOfDisplayBars.push(i);
          }
        });

        this.props.brandSpecificDetails[1].map(ele => {
          relativityPremium.push({"count": ++j, "relativityPremium": ele.relativity*100});
        });
      }

      if(this.state.ageBasedSwitchStatus == 'off') {
          quotedPremiumOrRelativityValue = quotedPremium;
          YquotedPremiumOrRelativityText = "quotedPremium";
      } else {
          quotedPremiumOrRelativityValue = relativityPremium;
          YquotedPremiumOrRelativityText = "relativityPremium";
      }

      console.log(numberOfQuotes);
      console.log(numberOfWins);
      console.log(quotedPremium);
      console.log(relativityPremium);
      console.log(XaxisDisplayText);
      console.log(numberOfDisplayBars);

      return (
        <main className='brand-specific-page'>
          <h3>{this.props.brandName}</h3>
          <div className='brand-specific-wrapper'>
            <div className="slidecontainer">
              <input type="range" min="1" max="5" value={this.state.ageBasedRank} className="slider" onChange={this._handleAgeBasedRankChange.bind(this)}/>
              Rank {this.state.ageBasedRank}
            </div>
            <div className="switchcontainer">
              <div className="onoffswitch">
                  <input value={this.state.ageBasedSwitchStatus} onChange = {this._handleAgeBasedSwitch.bind(this)} type="checkbox" className="onoffswitch-checkbox" id="myonoffswitch" defaultChecked />
                  <label className="onoffswitch-label" htmlFor="myonoffswitch">
                      <span className="onoffswitch-inner"></span>
                      <span className="onoffswitch-switch"></span>
                  </label>
              </div>
            </div>

            <section className='graph-container'>

              <AgeQtesWins
                numberOfQuotes= {numberOfQuotes}
                numberOfWins = {numberOfWins}
                quotedPremiumOrRelativityValue = {quotedPremiumOrRelativityValue}
                XaxisDisplayText = {XaxisDisplayText}
                numberOfDisplayBars = {numberOfDisplayBars}
                YquotedPremiumOrRelativityText = {YquotedPremiumOrRelativityText}/>


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
    bindActionCreators({generateAgeQtesWinsApi, getAgeQtesWins, getAgeBandRel, generateAgeBandRelApi}, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(BrandSpecific);
