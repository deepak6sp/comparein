import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from '../components/header';

import LoginForm from '../containers/loginForm';
import MarketSummary from '../containers/marketSummary';


const Router = () =>
    <BrowserRouter>
       <div>
          <Header/>
          <Route path="/login" component={ () => <LoginForm/> }/>
          <Route path="/market-summary" component={() => <MarketSummary/> } />
          <Route path="/admin" component={() => <LoginForm loginType='admin'/> } />
       </div>
    </BrowserRouter>;

export default Router;
