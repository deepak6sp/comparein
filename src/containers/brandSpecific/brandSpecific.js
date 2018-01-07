
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {generateAgeWinsApi, getAgeWins} from '../../actions/brandSpecific';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

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
      return (
        <main className='brand-specific-page'>
        aasds
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
