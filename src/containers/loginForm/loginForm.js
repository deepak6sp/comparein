import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UI from '../../components/ui';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    /**
     * This is a controlled form component.
     * It will dispatch inputValue to actions, on form submit
     * @param {e} e eventhandler
     */
    _handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.username);
        console.log(this.state.password);
        window.location = '/market-summary';
    }

    /**
     * Updates the state on input value
     * @param {e} e eventhandler
     */
    _handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }



    render() {
        return (
            <main className='login-form-page'>
                <form className='login-form-box' onSubmit={this._handleSubmit.bind(this)} >
                  <section className='login-form-box-header'>
                    Login
                  </section>
                  <section className='login-form-box-body'>
                    <UI.Input
                    type='text'
                    name='username'
                    value={this.state.username}
                    onChange={this._handleChange.bind(this)}/>
                    <UI.Input
                      type='text'
                      name='password'
                      value={this.state.password}
                      onChange={this._handleChange.bind(this)}/>
                    <UI.Input
                      type='submit'
                      value='Submit'/>
                    <p className='forgot-password'> forgot password? </p>
                  </section>
                </form>
            </main>
        );
    }
}



// Bind actions, states and component to the store
export default LoginForm;
