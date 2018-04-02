import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {generateSimulatedDataRanks} from '../../actions/simulation';

import AgeQuotes from './ageQuotes';
import SiQuotes from './siQuotes';


class EditSimulation extends Component {

    constructor(props) {
        super(props);
 
    }
    
    _handleOnAgeBandChanges(ageBandChanges) {
      this.setState({ageBandChanges});
    }

    _handleOnSiBandChanges(siBandChanges) {
      this.setState({siBandChanges});
    }

    _handleSubmit(e) {
      e.preventDefault();
      console.log("in simulationjs");
      console.log(this.state.ageBandChanges);
      generateSimulatedDataRanks({ageBandChanges: this.state.ageBandChanges, siBandChanges: this.state.siBandChanges});
      window.location.reload(true);
    }


    _handleReset() {
      generateSimulatedDataRanks({ageBandChanges: 'reset'});
      window.location.reload(true);
    }

    render() {

        if(this.props.brandSpecificDetails.length != 0 && this.props.simulatedResults.length != 0) {

          return (
            <main className='market-summary-page'>
              <div className='market-summary-wrapper'>
                <section className='graph-container'>
                <div className='simulation-buttons'>
                  <a 
                    className='button reset-button'
                    onClick={this._handleReset.bind(this)}> Cancel Editing </a>
                </div>

                <AgeQuotes 
                    brandSpecificDetails = {this.props.brandSpecificDetails}
                    simulatedResults = {this.props.simulatedResults}
                    editMode = {this.props.editMode}
                    onAgeBandChanges = {this._handleOnAgeBandChanges.bind(this)}/>

                <SiQuotes 
                    brandSpecificDetails = {this.props.brandSpecificDetails}
                    simulatedResults = {this.props.simulatedResults}
                    editMode = {this.props.editMode}
                    onSiBandChanges = {this._handleOnSiBandChanges.bind(this)}/>

                <form onSubmit={this._handleSubmit.bind(this)}>
                    <button>Save</button>
                </form>

                </section>
              </div>
            </main>
          );
        } else {
            return <div>Wait for simulation to load...</div>
        }
    }
}


// Bind actions, states and component to the store
export default EditSimulation;
