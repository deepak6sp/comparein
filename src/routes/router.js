import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import LoginForm from '../containers/loginForm';
import Header from '../components/header';


const Router = () =>
    <BrowserRouter>
       <div>
          <Header/>
          <Route exact path="/" component={ () => <LoginForm/> }/>
          <Route path="/page2" component={() => <div>hello3</div> } />
          <Route path="/page3" component={() => <div>hello3</div> }/>
       </div>
    </BrowserRouter>;

export default Router;
