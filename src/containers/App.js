import React, {Component} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import * as mainActions from '../Actions/MainActions';
import routes from './../routes';
import AppBarC from './../components/appBar/AppBarComponent'
import { Router} from 'react-router-dom'
import './main-style.scss'
import Footer from "./Footer/Footer";
import { createBrowserHistory } from 'history';
const history  = createBrowserHistory();

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <AppBarC />
          {routes}
          {Footer}
        </div>
      </Router>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(mainActions, dispatch)
  }
}

const mapStateToProps = (state) => {
  return {
    coinsData: state.reducerMain,
    user:state.userReducer
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App)
