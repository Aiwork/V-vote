import React, {Component} from 'react';
import './Chat.scss'
import * as mainActions from "../../Actions/MainActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ErrorMessage from "../../commons/ErrorMessage/ErrorMessage";

const W3CWebSocket = require('websocket').w3cwebsocket;

const PROD_WEBSOCKET_URL = 'ws://' + window.location.hostname + '/api/chatsocket';
const TEST_WEBSOCKET_URL = 'ws://crypto-coin-trend.herokuapp.com/api/chatsocket';
const TEST_LOCAL_WEBSOCKET_URL = 'ws://localhost:5000/api/chatsocket';

class Chat extends Component {
  constructor(props) {
    super(props);
    const client = new W3CWebSocket(TEST_WEBSOCKET_URL);
    this.state = {
      client: client,
      message: ''
    };

    let self = this;
    this.state.client.onmessage = function (e) {
      let message_recieved = JSON.parse(e.data);
      self.props.newChatMessage(message_recieved);
    };
  }

  handleMessageChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleNewMessage() {
    console.log('handleNewMessage',this.state.message);
    if(this.state.message){
      let client = this.state.client;
      if (client.readyState === client.OPEN) {
        let chat_message = JSON.stringify({
          'body': this.state.message,
          'token': mainActions.getToken(),
          'user': this.props.username
        });
        client.send(JSON.stringify(chat_message));
        this.setState({message: ''});
      }
    }

  }

  render() {
    const user = this.props.user;
    let messagesArr = this.props.messages;
    return (
      <div className="chat_col">
        <div className="chat_div">
          <div className="messages_block">
            {messagesArr ? messagesArr.map((message, i) =>
              <div className="w-clearfix" key={i}>
                <div className="nickname">{message.user}:</div>
                <div className="text_message">{message.body}</div>
              </div>
            ) : null}
          </div>
          {user.logdin ? <div className="w-form">
              <form id="email-form-2" name="email-form-2" data-name="Email Form 2" className="w-clearfix">
                <input type="text" className="message_input w-input" maxLength="256" name="name-3"
                       data-name="Name 3" onChange={this.handleMessageChange.bind(this)} value={this.state.message}
                       placeholder="Enter your Message" id="name-3"/>
                <a href="#" className="send_button w-button_chat" onClick={() => this.handleNewMessage()}>‍</a>
              </form>
            </div>
            : ErrorMessage('need to sign in to chat')}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLogdin: state.userReducer.logdin,
    username: state.userReducer.username,
    messages: state.reducerMain.messages

  }
};

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(mainActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
