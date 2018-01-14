
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateAgeQtesWinsApi, getAgeQtesWins,
        getAgeBandRel, generateAgeBandRelApi,
        generateSiQtesWinsApi, getSiQtesWins,
        getSiBandRel, generateSiBandRelApi} from '../../actions/brandSpecific';
import { VictoryBar, VictoryLine, VictoryChart, VictoryAxis, VictoryScatter,
        VictoryTheme, VictoryStack, VictoryGroup, VictoryTooltip} from 'victory';

import UI from '../../components/ui';
import AgeQtesWins from './ageQtesWins.js';

class BrandSpecific extends Component {

    constructor(props) {
        super(props);

        this.state = {
          ageBasedRank: 1,
          ageBasedSwitchStatus: "off",
          siBasedRank : 1,
          siBasedSwitchStatus: "off",
        };
    }

    componentDidMount() {
        // this is for age quotes and relativity values
      this.props.generateAgeQtesWinsApi(this.props.brandName);
      this.props.getAgeQtesWins(this.props.brandName);
      this.props.generateAgeBandRelApi(this.props.brandName);
      this.props.getAgeBandRel(this.props.brandName);

      // this is for si quotes and relativity values
      this.props.generateSiQtesWinsApi(this.props.brandName);
      this.props.getSiQtesWins(this.props.brandName);
      this.props.generateSiBandRelApi(this.props.brandName);
      this.props.getSiBandRel(this.props.brandName);

    }

    _handleAgeBasedRankChange(e) {
      console.log(e.target.value);
      this.setState({ageBasedRank: e.target.value});
    }

    _handleSiBasedRankChange(e) {
      console.log(e.target.value);
      this.setState({siBasedRank: e.target.value});
    }

    _handleAgeBasedSwitch(e) {
      if(e.target.value == "off") {
        this.setState({ageBasedSwitchStatus: 'on'});
      } else {
        this.setState({ageBasedSwitchStatus: 'off'});
      }
    }

    _handleSiBasedSwitch(e) {
      console.log("here");
      if(e.target.value == "off") {
        this.setState({siBasedSwitchStatus: 'on'});
      } else {
        this.setState({siBasedSwitchStatus: 'off'});
      }
    }

    render() {
      // this is for age quotes and relativity values
      let ageQtesAndRel = {
        numberOfQuotes : [],
        numberOfWins : [],
        XaxisDisplayText : [],
        numberOfDisplayBars : [],
        quotedPremium : [],
        relativityPremium : [],
        quotedPremiumOrRelativityValue : [],
        YquotedPremiumOrRelativityText: ''
      }

      // this is for si quotes and relativity values
      let siQtesAndRel = {
        numberOfQuotes : [],
        numberOfWins : [],
        XaxisDisplayText : [],
        numberOfDisplayBars : [],
        quotedPremium : [],
        relativityPremium : [],
        quotedPremiumOrRelativityValue : [],
        YquotedPremiumOrRelativityText: ''
      }

      // preparing data to feed it to graph
      if(this.props.brandSpecificDetails.length > 3) {
        console.log(this.props.brandSpecificDetails);
        let i=0, j=0, k=0, l=0;
        // this is for age quotes and relativity values
        this.props.brandSpecificDetails[0].map(ele => {
          if(ele.rank == this.state.ageBasedRank) {
            ageQtesAndRel.numberOfQuotes.push({"count": ++i, "quotes": ele.quotes});
            ageQtesAndRel.numberOfWins.push({"count": i, "wins": ele.wins});
            ageQtesAndRel.quotedPremium.push({"count": i, "quotedPremium": ele.asp});
            ageQtesAndRel.XaxisDisplayText.push(ele.ageBand);
            ageQtesAndRel.numberOfDisplayBars.push(i);
          }
        });

        this.props.brandSpecificDetails[1].map(ele => {
            ageQtesAndRel.relativityPremium.push({"count": ++j, "relativityPremium": ele.relativity*100});
        });

        // this is for si quotes and relativity values
        this.props.brandSpecificDetails[2].map(ele => {
          if(ele.rank == this.state.siBasedRank) {
            siQtesAndRel.numberOfQuotes.push({"count": ++k, "quotes": ele.quotes});
            siQtesAndRel.numberOfWins.push({"count": k, "wins": ele.wins});
            siQtesAndRel.quotedPremium.push({"count": k, "quotedPremium": ele.asp});
            siQtesAndRel.XaxisDisplayText.push(ele.siBand);
            siQtesAndRel.numberOfDisplayBars.push(k);
          }
        });

        this.props.brandSpecificDetails[3].map(ele => {
            siQtesAndRel.relativityPremium.push({"count": ++l, "relativityPremium": ele.relativity*100});
        });

      }

      if(this.state.ageBasedSwitchStatus == 'off') {
          ageQtesAndRel.quotedPremiumOrRelativityValue = ageQtesAndRel.quotedPremium;
          ageQtesAndRel.YquotedPremiumOrRelativityText = "quotedPremium";
      } else {
          ageQtesAndRel.quotedPremiumOrRelativityValue = ageQtesAndRel.relativityPremium;
          ageQtesAndRel.YquotedPremiumOrRelativityText = "relativityPremium";
      }

      if(this.state.siBasedSwitchStatus == 'off') {
          siQtesAndRel.quotedPremiumOrRelativityValue = siQtesAndRel.quotedPremium;
          siQtesAndRel.YquotedPremiumOrRelativityText = "quotedPremium";
      } else {
          siQtesAndRel.quotedPremiumOrRelativityValue = siQtesAndRel.relativityPremium;
          siQtesAndRel.YquotedPremiumOrRelativityText = "relativityPremium";
      }

      console.log(ageQtesAndRel.numberOfQuotes);
      console.log(ageQtesAndRel.numberOfWins);
      console.log(ageQtesAndRel.quotedPremium);
      console.log(ageQtesAndRel.relativityPremium);
      console.log(ageQtesAndRel.XaxisDisplayText);
      console.log(ageQtesAndRel.numberOfDisplayBars);

      // display prepared data from above
      return (
        <main className='brand-specific-page'>
          <h3>{this.props.brandName}</h3>
          <div className='brand-specific-wrapper'>
            <section className='graph-container'>

              <div className="slidecontainer">
                <input type="range" min="1" max="5" value={this.state.ageBasedRank} className="slider" onChange={this._handleAgeBasedRankChange.bind(this)}/>
                Rank {this.state.ageBasedRank}
              </div>

              <div className="switchcontainer">
                <div className="onoffswitch">
                    <input value={this.state.ageBasedSwitchStatus} onChange = {this._handleAgeBasedSwitch.bind(this)} type="checkbox" className="onoffswitch-checkbox" id="ageOnoffswitch" defaultChecked />
                    <label className="onoffswitch-label" htmlFor="ageOnoffswitch">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>
              </div>

              <AgeQtesWins
                numberOfQuotes= {ageQtesAndRel.numberOfQuotes}
                numberOfWins = {ageQtesAndRel.numberOfWins}
                quotedPremiumOrRelativityValue = {ageQtesAndRel.quotedPremiumOrRelativityValue}
                XaxisDisplayText = {ageQtesAndRel.XaxisDisplayText}
                numberOfDisplayBars = {ageQtesAndRel.numberOfDisplayBars}
                YquotedPremiumOrRelativityText = {ageQtesAndRel.YquotedPremiumOrRelativityText}/>


              <div className='graph-label-desc'>
                <div className="red">Quoted Premium</div>
                <div className="green-dark">Number Of Quotes</div>
                <div className="green-primary">Number Of Wins</div>
              </div>

              <div className="slidecontainer">
                <input type="range" min="1" max="5" value={this.state.siBasedRank} className="slider" onChange={this._handleSiBasedRankChange.bind(this)}/>
                Rank {this.state.siBasedRank}
              </div>

              <div className="switchcontainer">
                <div className="onoffswitch">
                    <input value={this.state.siBasedSwitchStatus} onChange = {this._handleSiBasedSwitch.bind(this)} type="checkbox" className="onoffswitch-checkbox" id="siOnoffswitch" defaultChecked />
                    <label className="onoffswitch-label" htmlFor="siOnoffswitch">
                        <span className="onoffswitch-inner"></span>
                        <span className="onoffswitch-switch"></span>
                    </label>
                </div>
              </div>

              <AgeQtesWins
                numberOfQuotes= {siQtesAndRel.numberOfQuotes}
                numberOfWins = {siQtesAndRel.numberOfWins}
                quotedPremiumOrRelativityValue = {siQtesAndRel.quotedPremiumOrRelativityValue}
                XaxisDisplayText = {siQtesAndRel.XaxisDisplayText}
                numberOfDisplayBars = {siQtesAndRel.numberOfDisplayBars}
                YquotedPremiumOrRelativityText = {siQtesAndRel.YquotedPremiumOrRelativityText}/>

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
    bindActionCreators({
      generateAgeQtesWinsApi, getAgeQtesWins,
      getAgeBandRel, generateAgeBandRelApi,
      generateSiQtesWinsApi, getSiQtesWins,
      getSiBandRel, generateSiBandRelApi
    }, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(BrandSpecific);
