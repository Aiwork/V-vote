import React from 'react';
import './ErrorMessage.scss'
const ErrorMessage = (message) => {
  return (
    <div className="infoMessage">
      <div className="iconInfo"/>
      <div className="text_messageInfo">{message}</div>
    </div>
  );
};

export default ErrorMessage;
