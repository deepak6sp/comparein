
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
import AgeSiGraph from './ageSiGraph';
import GraphSelectionSliders from './graphSelectionSliders';
import GraphLabelDescription from './graphLabelDescription';

import Choropleth from './choropleth';


class BrandSpecific extends Component {

    constructor(props) {
        super(props);

        this.state = {
          ageBasedRank: 1,
          ageBasedSwitchStatus: "off",
          siBasedRank : 1,
          siBasedSwitchStatus: "off",
          ageRedLabel: "Quoted Premium",
          siRedLabel: "Quoted Premium",
          showAgeRankSlider: true,
          showSiRankSlider: true,
        };
    }

    componentDidMount() {
        // this is for age quotes and relativity values
      this.props.generateAgeQtesWinsApi(this.props.brandName);
      //this.props.getAgeQtesWins(this.props.brandName);
      this.props.generateAgeBandRelApi(this.props.brandName);
      //this.props.getAgeBandRel(this.props.brandName);

      // this is for si quotes and relativity values
      this.props.generateSiQtesWinsApi(this.props.brandName);
      //this.props.getSiQtesWins(this.props.brandName);
      this.props.generateSiBandRelApi(this.props.brandName);
      //this.props.getSiBandRel(this.props.brandName);
     
    }

    _handleAgeBasedRankChange(e) {
      this.setState({ageBasedRank: e.target.value});
    }

    _handleSiBasedRankChange(e) {
      this.setState({siBasedRank: e.target.value});
    }

    _handleAgeBasedSwitch(e) {
      if(e.target.value == "off") {
        this.setState({ageBasedSwitchStatus: 'on'});
        this.setState({ageRedLabel: "Relativity"});
        this.setState({showAgeRankSlider: false});
      } else {
        this.setState({ageBasedSwitchStatus: 'off'});
        this.setState({ageRedLabel: "Quoted Premium"});
        this.setState({showAgeRankSlider: true});
      }
    }

    _handleSiBasedSwitch(e) {
      if(e.target.value == "off") {
        this.setState({siBasedSwitchStatus: 'on'});
        this.setState({siRedLabel: "Relativity"});
        this.setState({showSiRankSlider: false});
      } else {
        this.setState({siBasedSwitchStatus: 'off'});
        this.setState({siRedLabel: "Quoted Premium"});
        this.setState({showSiRankSlider: true});
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

      // display prepared data from above
      return (
        <main className='brand-specific-page'>
          <h3>{this.props.brandName}</h3>
          <div className='brand-specific-wrapper'>
            <section className='graph-container'>

              <div className='ageBasedGraphs'>
                <GraphSelectionSliders
                  showRankSlider = {this.state.showAgeRankSlider}
                  rank = {this.state.ageBasedRank}
                  handleRankChange = {this._handleAgeBasedRankChange.bind(this)}
                  switchStatus = {this.state.ageBasedSwitchStatus}
                  handleSwitch = {this._handleAgeBasedSwitch.bind(this)}
                  switchId = "ageOnoffswitch"/>

                <AgeSiGraph
                  numberOfQuotes= {ageQtesAndRel.numberOfQuotes}
                  numberOfWins = {ageQtesAndRel.numberOfWins}
                  quotedPremiumOrRelativityValue = {ageQtesAndRel.quotedPremiumOrRelativityValue}
                  XaxisDisplayText = {ageQtesAndRel.XaxisDisplayText}
                  numberOfDisplayBars = {ageQtesAndRel.numberOfDisplayBars}
                  YquotedPremiumOrRelativityText = {ageQtesAndRel.YquotedPremiumOrRelativityText}/>

                <GraphLabelDescription
                  redLabel = {this.state.ageRedLabel}
                  greenDarkLabel = "Number Of Quotes"
                  greenPrimarylabel = "Number Of Wins" />
              </div>

              <div className='siBasedGraphs'>
                <GraphSelectionSliders
                  showRankSlider = {this.state.showSiRankSlider}
                  rank = {this.state.siBasedRank}
                  handleRankChange = {this._handleSiBasedRankChange.bind(this)}
                  switchStatus = {this.state.siBasedSwitchStatus}
                  handleSwitch = {this._handleSiBasedSwitch.bind(this)}
                  switchId = "siOnoffswitch"/>

                <AgeSiGraph
                  numberOfQuotes= {siQtesAndRel.numberOfQuotes}
                  numberOfWins = {siQtesAndRel.numberOfWins}
                  quotedPremiumOrRelativityValue = {siQtesAndRel.quotedPremiumOrRelativityValue}
                  XaxisDisplayText = {siQtesAndRel.XaxisDisplayText}
                  numberOfDisplayBars = {siQtesAndRel.numberOfDisplayBars}
                  YquotedPremiumOrRelativityText = {siQtesAndRel.YquotedPremiumOrRelativityText}/>

                <GraphLabelDescription
                  redLabel = {this.state.siRedLabel}
                  greenDarkLabel = "Number Of Quotes"
                  greenPrimarylabel = "Number Of Wins" />
              </div>
              <Choropleth />

              

              {/* <div className="iframe-container" >
                <a target="_blank" href="https://zenlytics.shinyapps.io/pricePositon/">Open in a new window</a>
                <iframe id="position_iframe" src="https://zenlytics.shinyapps.io/pricePositon/"></iframe>
              </div>  */}
              
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
