import React, {Component} from 'react';
import './../Login/Login.scss'
import {Redirect, Link} from 'react-router-dom'
import Loading from "../Loading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainActions from "../../Actions/MainActions";
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {voteValidation} from '../../Actions/validation/voteValidatin'

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      username: '',
      email: '',
      password: '',
      rePassword: '',
      loading: false,
      redirectToReferrer: false,
      errorMessage:false,
      checkInput: voteValidation.signUpSuccess()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        voteValidation.signUpSuccess()?this.setState({checkInput:true}):this.setState({checkInput:false});
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

  handleRePasswordChange(e) {
    if (this.state.password === e.target.value) {
      this.setState({rePassword: e.target.value, checkInput: true});
    }
    this.setState({rePassword: e.target.value, checkInput: false});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }


  handleChange(eveny, value) {
    event.preventDefault();
    console.log('value', value);
    this.setState({value: value});
  };

  handleChangeIndex(index) {
    this.setState({value: index});
  };

  register(event) {
    event.preventDefault();
    this.setState({loading: true});
    let user = {username: this.state.username, password: this.state.password, email: this.state.email};
    console.log('user', user);
    this.props.registerUser(user).then((response) => {
      console.log('response', response);
      if (response.type === "REGISTER_USER") {
        this.props.loginUser(user).then((response) => {
          if (response.type === "ERROR_LOGIN") {
            console.log("ERROR_LOGIN", user.username);
          }
          else {
            this.setState({loading: false, redirectToReferrer: true});
          }
        });
      }
      else {
        this.setState({loading: false, redirectToReferrer: false});

      }
    })

  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.register(e);
    }
  }

  render() {
    const {redirectToReferrer, loading} = this.state;
    const required =true
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
              <h2 className="form_title">Sign Up</h2>
              <Form className="log_form">
                <Input className="username_field w-input" value={this.state.username}
                       onChange={this.handleUsernameChange.bind(this)}
                       validations={[voteValidation.username]}
                       id="username" maxLength="256"
                       type='text' name="User-Name" data-name="User Name" placeholder="User Name"
                       required/>
                <Input value={this.state.email} onChange={this.handleEmailChange.bind(this)}
                       validations={[voteValidation.required, voteValidation.email]}
                       type="email" className="mail_field w-input" maxLength="256" name="User-Name-2"
                       data-name="User Name 2" placeholder="Email" id="User-Name-2" required/>
                <Input value={this.state.password} onChange={this.handlePasswordChange.bind(this)}
                       validations={[voteValidation.required]}
                       className="password_field w-input" type='password' name="Password"
                       data-name="Password 2" placeholder='Password'
                       required maxLength="256"/>
                <Input value={this.state.rePassword} onChange={this.handleRePasswordChange.bind(this)}
                       validations={[voteValidation.required,voteValidation.password]}
                       type="password"
                       name="Password-2"
                       className="password_again w-input" maxLength="256" placeholder="Password Again" required/>

                {this.state.errorMessage&& (!this.state.checkInput &&this.state.errorMessage)?voteValidation.errorMessage("Please enter all the necessary data"):null}
                <div className="topbutton">
                  {this.state.checkInput?
                    <div className="log__button w-button" onClick={this.register.bind(this)}
                  >Sign Up
                  </div>:
                    <div className="log__button log__buttonErr w-button" 
                         onClick={() => {this.setState({errorMessage:true})}}
                    >Sign Up
                    </div>}

                  <div className="sign_up_block">
                    <div>Already have account?
                      <Link to={`/login`} className="sign_up_link">Log In</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);