import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import {generateAgeQtesWinsApi, generateSiQtesWinsApi} from '../../actions/brandSpecific';

import {getSimulatedPremiumWins, getSimulatedAgeQtesWins, getSimulatedSiQtesWins} from '../../actions/simulation';
import {generateSimulatedDataRanks} from '../../actions/simulation';

import MarketSummary from './marketSummary';
import AgeQuotes from './ageQuotes';
import SiQuotes from './siQuotes';


class Simulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showMarketSummary: true,
          showAgeQuotes: false,
          showSiQuotes: false,
          editMode: false,
          ageBandChanges: ''
        }
    }

    componentDidMount() {
      this.props.getPremiumWins();
      this.props.generateAgeQtesWinsApi('AAMI');
      this.props.generateSiQtesWinsApi('AAMI');
      this.props.getSimulatedPremiumWins();
    }

    _handleSelectedBrand(name) {
      //this.props.generateAgeWinsApi(name);
      window.location = '/brand-specific/'+name;
    }

    _showMarketSummary() {
      this.props.getSimulatedPremiumWins();
      this.setState({showMarketSummary: true});
      this.setState({showSiQuotes: false});
      this.setState({showAgeQuotes: false});
    }

    _showAgeQuotes() {
      this.props.getSimulatedAgeQtesWins('AAMI');
      this.setState({showMarketSummary: false});
      this.setState({showSiQuotes: false});
      this.setState({showAgeQuotes: true});
    }

    _showSiQuotes() {
      this.props.getSimulatedSiQtesWins('AAMI');
      this.setState({showMarketSummary: false});
      this.setState({showAgeQuotes: false});
      this.setState({showSiQuotes: true});
    }

    _handleOnAgeBandChanges(ageBandChanges) {
      this.setState({ageBandChanges});
    }

    _handleSubmit(e) {
      e.preventDefault();
      console.log("in simulationjs");
      console.log(this.state.ageBandChanges);
      generateSimulatedDataRanks({ageBandChanges: this.state.ageBandChanges});
      window.location.reload(true);
    }

    _handleEdit() {
      this.setState({editMode: true});
    }

    _handleReset() {
      generateSimulatedDataRanks({ageBandChanges: 'reset'});
      window.location.reload(true);
    }

    render() {

        if(this.props.newSummary.length != 0 && this.props.simulatedResults.length != 0) {

          return (
            <main className='market-summary-page'>
              <div className='market-summary-wrapper'>
                <section className='graph-container'>
                <a 
                  className="button market-summary"
                  onClick={this._showMarketSummary.bind(this)}>Show Market Summary</a>
                <a 
                  className="button age-quotes"
                  onClick={this._showAgeQuotes.bind(this)}>Show Age Quotes Wins</a>
                <a 
                  className="button si-quotes"
                  onClick={this._showSiQuotes.bind(this)}>Show SI Quotes Wins</a>
                <a 
                  className='button edit-button'
                  onClick={this._handleEdit.bind(this)}> Simulate Values </a>
                <a 
                  className='button rest-button'
                  onClick={this._handleReset.bind(this)}> Reset Values </a>

                
                  {this.state.showMarketSummary &&
                    <MarketSummary 
                      newSummary = {this.props.newSummary}
                      simulatedResults = {this.props.simulatedResults}/>
                  }

                  {this.state.showAgeQuotes &&
                    <AgeQuotes 
                      brandSpecificDetails = {this.props.brandSpecificDetails}
                      simulatedResults = {this.props.simulatedResults}
                      editMode = {this.state.editMode}
                      onAgeBandChanges = {this._handleOnAgeBandChanges.bind(this)}/>
                  }

                   {this.state.showSiQuotes &&
                    <SiQuotes 
                      brandSpecificDetails = {this.props.brandSpecificDetails}
                      simulatedResults = {this.props.simulatedResults}/>
                  }

                  {(this.state.editMode && !this.state.showMarketSummary) && 
                    <form onSubmit={this._handleSubmit.bind(this)}>
                      <button>Save</button>
                    </form>
                  }

                </section>
              </div>
            </main>
          );
        } else {
          return <div>
              <a 
                className="button market-summary"
                onClick={this._showMarketSummary.bind(this)}>Show Market Summary</a>
              <a 
                className="button age-quotes"
                onClick={this._showAgeQuotes.bind(this)}>Show Age Quotes Wins</a>
              <a 
                className="button si-quotes"
                onClick={this._showSiQuotes.bind(this)}>Show SI Quotes Wins</a>
          </div>
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
  brandSpecificDetails: state.brandSpecificDetails,
  simulatedResults: state.simulatedResults
});


/**
 * This will dispatch new value to actions from the
 * component as this.props.submitText
 * @param  {Dispatch} dispatch redux dispatcher
 * @return {Function}          submitText is the function located in Actions
 */
const matchDispatchToProps = dispatch =>
    bindActionCreators({
      getPremiumWins, generateAgeQtesWinsApi, generateSiQtesWinsApi,
      getSimulatedPremiumWins, getSimulatedAgeQtesWins, getSimulatedSiQtesWins
    }, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(Simulation);
