import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from '../components/header';

import LoginForm from '../containers/loginForm';
import MarketSummary from '../containers/marketSummary';
import BrandSpecific from '../containers/brandSpecific';


const Router = () =>
    <BrowserRouter>
       <div>
          <Header/>
          <Route exact path="/" component={ () => <LoginForm/> }/>
          <Route path="/login" component={ () => <LoginForm/> }/>
          <Route path="/market-summary" component={() => <MarketSummary/> } />
          <Route path="/brand-specific" component={BranchSpecific} />
          <Route path="/admin" component={() => <LoginForm loginType='admin'/> } />
       </div>
    </BrowserRouter>;

const BranchSpecific = ({match}) => (
  <div>
    <Route path={`${match.url}/:brandName`} render={BranchSpecificName} />
    <Route exact path={match.url} render={() => (
      <h3>Please select a brandName.</h3>
    )}/>
  </div>
);

const BranchSpecificName = ({match}) => <BrandSpecific brandName={match.params.brandName}/> ;

export default Router;
