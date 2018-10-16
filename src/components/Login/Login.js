import React, {Component} from 'react';
import './Login.scss'
import Loading from "../Loading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainActions from "../../Actions/MainActions";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {voteValidation} from '../../Actions/validation/voteValidatin'

import {
  Redirect, Link
} from 'react-router-dom';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      username: '',
      email: '',
      password: '',
      loading: false,
      redirectToReferrer: false,
      errorMessage:false,
      checkInput:voteValidation.loginSuccess()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        voteValidation.loginSuccess()?this.setState({checkInput:true}):this.setState({checkInput:false});
      },
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }


  handleChange(eveny, value) {
    event.preventDefault();
    console.log('value', value);
    this.setState({value: value});
  };

  handleChangeIndex(index) {
    this.setState({value: index});
  };

  authenticate(event) {
    let self = this;
    event.preventDefault();
    this.setState({loading: true});
    if (!self.state.value) {
      let user = {username: this.state.username, password: this.state.password};
      this.props.loginUser(user).then((response) => {
        if (response.type === "ERROR_LOGIN") {
          this.setState({loading: false, redirectToReferrer: false});
        }
        else {
          this.setState({loading: false, redirectToReferrer: true});
        }
      })
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.authenticate(e);
    }
  }

  render() {
    const {redirectToReferrer, loading} = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to='/'/>
      )
    }
    else {
      return loading ? <Loading/> :

        <div className='mainLogin' onKeyPress={this.onKeyPress.bind(this)}>
          <div className="log_in_container w-container">
            <div className="log_form_block w-clearfix w-form">
              <h2 className="form_title">Log
                In</h2>
              <Form className="log_form">
                <Input className="username_field w-input" value={this.state.username}
                       onChange={this.handleUsernameChange.bind(this)} maxLength="256"
                       validations={[voteValidation.username]}
                       type='text' name="User-Name" data-name="User Name" placeholder="User Name" required='required'/>
                <Input value={this.state.password} onChange={this.handlePasswordChange.bind(this)}
                       className="password_field w-input" type='password' name="Password-2"
                       data-name="Password 2" placeholder='Password'
                       validations={[voteValidation.required]}
                       required='required'/>
                {this.state.errorMessage&& (!this.state.checkInput &&this.state.errorMessage)?voteValidation.errorMessage("Please enter login and password"):null}
                <div className="topbutton">
                  {this.state.checkInput?
                    <div className={this.state.checkInput?"log__button w-button":"log__button log__buttonErr w-button"} onClick={this.authenticate.bind(this)}
                    >Log In
                    </div>:<div
                      onClick={() => {this.setState({errorMessage:true})}}
                      className={this.state.checkInput?"log__button w-button":"log__button log__buttonErr w-button"}>Log In
                    </div>
                  }

                  <div className="sign_up_block">
                    <div>Do not have account?
                      <Link className="sign_up_link" to={`/SignUp`}>Sign Up</Link>
                    </div>
                  </div>
                </div>

              </Form>
            </div>
          </div>
        </div>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userLogdin: state.userReducer.logdin,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);