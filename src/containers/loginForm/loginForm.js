import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import UI from '../../components/ui';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            loginType: props.loginType
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
        //document.getElementById('login-form-box').submit();
        let formData = new FormData();
        // formData.append('username', this.state.username);
        // formData.append('password', this.state.password);

        formData.username = this.state.username;
        formData.password = this.state.password;

        fetch("/login", {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(res => {
          if(res.found) {
            window.location = '/market-summary';
          } else {
            window.location = '/admin/users';
          }
        })

        // if(this.state.loginType == 'admin') {
        //   window.location = '/admin/users';
        // } else {
        //   window.location = '/market-summary';
        // }
    }

    /**
     * Updates the state on input value
     * @param {e} e eventhandler
     */
    _handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }



    render() {
      console.log(!this.state.loginType);
        return (
            <main className='login-form-page'>
                <form id='login-form-box' className='login-form-box' onSubmit={this._handleSubmit.bind(this)} >
                  <section className='login-form-box-header'>
                    {this.state.loginType} Login
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
                    {(!this.state.loginType) &&
                      <p className='forgot-password'> forgot password? </p>
                    }
                  </section>
                </form>
            </main>
        );
    }
}



// Bind actions, states and component to the store
export default LoginForm;
