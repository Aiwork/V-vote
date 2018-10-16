import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './AppBarComponent.scss'
import {bindActionCreators} from "redux";
import * as mainActions from "../../Actions/MainActions";

class AppBarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: false
    }
  }

  hendleOpenMenu() {
    this.setState({openMenu: !this.state.openMenu})
  }

  render() {
    const {user}= this.props;
    return (
      <div className="root">
        <div data-collapse="medium" data-animation="default" data-duration="400" className="navigation">
          <div className="navigation_container">
            <nav role="navigation" className="nav_menu_background w-clearfix">

              <Link className="logo_container w-nav-brand" to={`/`} onClick={() =>this.props.notLoginPage()}>
              </Link>
              <Link className="nav_link w-nav-link" to={`/`}  onClick={() =>this.props.notLoginPage()}>
                Vote Room
              </Link>
              <Link className="nav_link w-nav-link" to={`/about`} >
                About Vote
              </Link>
              <Link className="nav_link w-nav-link" to={`/news`}>
                News
              </Link>
              <Link className="nav_link w-nav-link" to={`/api`}>
                API
              </Link>
              {user.logdin? <div className="user_dropdown" onClick={this.hendleOpenMenu.bind(this)}>
                <div>{user.username}</div>
                {this.state.openMenu ?
                  <div>
                    <div className="arrowIcon arrowIconDown"/>
                    <div className="dropdown_div">
                      <a href="settings.html" className="drop w-inline-block w-clearfix">
                        <div className="settings_icon">Settings</div>
                      </a>
                      <Link className="drop w-inline-block w-clearfix" to={`/history`}>
                        <div className="history_icon" onClick={()=>this.props.onShowCpanel()} >History</div>
                      </Link>
                      <a href="#" className="drop w-inline-block">
                        <div className="logout_icon" onClick={()=>this.props.signout()}>Log Out</div>
                      </a>
                    </div>
                  </div> :
                  <div className="arrowIcon arrowIconUp"/>}

              </div>: <Link className="log_in_button" to={`/login`} onClick={() =>this.props.onShowCpanel()} >
                Log In
              </Link>}

              <div className="search_icon w-clearfix">
                <div className="image-5"/>
                <div className="form-block w-form">
                  <form id="email-form-3" name="email-form-3" data-name="Email Form 3" className="w-clearfix">
                    <input type="text" className="search_field w-input" maxLength="256" name="name-4" data-name="Name 4"
                           placeholder="Search" id="name-4"/></form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

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
    user:state.userReducer
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(AppBarComponent);