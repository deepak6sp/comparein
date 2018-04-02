import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getPremiumWins} from '../../actions/marketSummary';
import {generateAgeQtesWinsApi, generateSiQtesWinsApi} from '../../actions/brandSpecific';

import {getSimulatedPremiumWins, getSimulatedAgeQtesWins, getSimulatedSiQtesWins,
  getEditSimulatedAgeQtesWins, getEditSimulatedSiQtesWins, clearReduxStore} from '../../actions/simulation';
import {generateSimulatedDataRanks} from '../../actions/simulation';

import MarketSummary from './marketSummary';
import AgeQuotes from './ageQuotes';
import SiQuotes from './siQuotes';
import EditSimulation from './edit';


class Simulation extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showMarketSummary: true,
          showAgeQuotes: false,
          showSiQuotes: false,
          editMode: false,
          ageBandChanges: '',
          siBandChanges: ''
        }
    }

    componentWillMount() {
      generateSimulatedDataRanks({ageBandChanges: 'reset'});
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
      if(!this.state.showMarketSummary) {
        this.props.getSimulatedPremiumWins();
        this.setState({showMarketSummary: true});
        this.setState({showSiQuotes: false});
        this.setState({showAgeQuotes: false});
      }
     
    }

    _showAgeQuotes() {
      if(!this.state.showAgeQuotes) {
        this.props.getSimulatedAgeQtesWins('AAMI');
        this.setState({showMarketSummary: false});
        this.setState({showSiQuotes: false});
        this.setState({showAgeQuotes: true});
      }
      
    }

    _showSiQuotes() {
      if(!this.state.showSiQuotes) {
        this.props.getSimulatedSiQtesWins('AAMI');
        this.setState({showMarketSummary: false});
        this.setState({showAgeQuotes: false});
        this.setState({showSiQuotes: true});
      }
    }

    _handleOnAgeBandChanges(ageBandChanges) {
      this.setState({ageBandChanges});
    }
    
    _handleOnSiBandChanges(siBandChanges) {
      this.setState({siBandChanges});
    }

    _handleEdit() {
      this.props.clearReduxStore();
      this.setState({editMode: true});
      this.props.getEditSimulatedAgeQtesWins('AAMI');
      this.props.getEditSimulatedSiQtesWins('AAMI');
    }

    _handleReset() {
      generateSimulatedDataRanks({ageBandChanges: 'reset'});
      window.location.reload(true);
    }

    render() {
      
        if(this.props.newSummary.length != 0 && this.props.simulatedResults.length != 0) {

          return (
            <main className='simulation-page'>
              <div className='simulation-wrapper'>
                {(!this.state.editMode) && 
                  <section className='graph-container'>
                    <div className='simulation-buttons'>
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
                  
                    </div>
                    {(this.state.showMarketSummary) &&
                      <MarketSummary 
                        newSummary = {this.props.newSummary}
                        simulatedResults = {this.props.simulatedResults[1].marketSummary}/>
                    }

                    {(this.state.showAgeQuotes) &&
                      <AgeQuotes 
                        brandSpecificDetails = {this.props.brandSpecificDetails}
                        simulatedResults = {this.props.simulatedResults}
                        editMode = {this.state.editMode}
                        onAgeBandChanges = {this._handleOnAgeBandChanges.bind(this)}/>
                    }

                    {(this.state.showSiQuotes) &&
                      <SiQuotes 
                        brandSpecificDetails = {this.props.brandSpecificDetails}
                        simulatedResults = {this.props.simulatedResults}
                        editMode = {this.state.editMode}
                        onAgeBandChanges = {this._handleOnSiBandChanges.bind(this)}/>
                    }
                   
                  </section>
                }
                {this.state.editMode && 
                  <EditSimulation
                    brandSpecificDetails = {this.props.brandSpecificDetails}
                    simulatedResults = {this.props.simulatedResults}
                    editMode = {this.state.editMode}/>
                }
              </div>
            </main>
          );
        } else {
          return <div> Simulation loading... </div>
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
      getSimulatedPremiumWins, getSimulatedAgeQtesWins, getSimulatedSiQtesWins,
      getEditSimulatedAgeQtesWins, getEditSimulatedSiQtesWins, clearReduxStore
    }, dispatch);


// Bind actions, states and component to the store
export default connect(matchStateToProps, matchDispatchToProps)(Simulation);
