import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import Page404 from './components/page404/page404'
import MainPage from "./components/MainPage/mainPage";




export default (
  <Switch>
    <Route path="/" exact component={MainPage}/>
    <Route component={Page404}/>
  </Switch>
);
