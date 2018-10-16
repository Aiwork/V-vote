import {createStore, applyMiddleware, combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import timestamp from 'unix-timestamp';
import * as constant from './constant';

const initUser = {
  logdin: false,
  username: null,
  userToken: null,
  onShowCpanel: false,
  myHistory:null
};
const initState = {
  allCoinsArrayWithData: [],
  voteActions: {
    event_time: null,
    coins: []
  },
  vote_error_message:[],
  messages: [],
  amount: 0
};

const userReducer = (state = initUser, action) => {
  switch (action.type) {
    case constant.SET_TOKEN:
      let newUser = action.payload;
      newUser.logdin = true;
      state = newUser;
      break;
    case constant.VERIFIED_TOKEN:
      state = {...state,username: action.payload.user, userToken: action.payload.token, logdin: true};
      break;
    case constant.UNVERIFIED_TOKEN:
      state = {...state, logdin: false};
      break;
    case constant.SET_HISTORY:
      console.log('SET_HISTORY',action.payload);
      state = {...state,myHistory:action.payload.data};
      break;
    case constant.ERROR_LOGIN:
      state = {...state, logdin: false};
      break;
    case constant.SHOW_CPANEL:
      state = {...state, onShowCpanel: true};
      break;
    case constant.NOT_SHOW_CPANEL:
      state = {...state, onShowCpanel: false};
      break;
    case constant.SIGNOUT:
      state = {
        logdin: null,
        username: null,
        userToken: null,
      };
      break;
  }
  return state;
};

const reducerMain = (state = initState, action) => {
  switch (action.type) {
    case constant.SET_VOTE_LIST:
      let data = action.payload[0];
      let labelsCoin = [];
      let pricesCoin = [];
      data.forEach(item => {
          labelsCoin.push(timestamp.toDate(item.time));
          pricesCoin.push(item.close);
        }
      );
      let coin = {'coin': action.payload[1], 'data': [labelsCoin, pricesCoin]};
      const newLine = {
        labels: labelsCoin,
        datasets: [
          {
            fill: true,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(250,250,250)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: pricesCoin
          }
        ]
      };
      state = {...state, allCoinsArrayWithData: [...state.allCoinsArrayWithData, {'line': newLine, 'coin': coin}]};
      break;
    case constant.SET_VOTE_ACTION:
      state = {...state,voteActions:{...state.voteActions,coins:action.payload}};
      break;
    case constant.SET_VOTE_ACTION_ERROR_MAX:
      console.log('vote_error_message',state.vote_error_message);
      state = {...state,vote_error_message:state.vote_error_message.concat([action.payload])};
      break;
    case constant.GET_ACTIONS:
      state = {...state, voteActions: action.payload};
      break;
    case constant.TIMER:
      state.voteActions.event_time ?
        state = {
          ...state,
          voteActions: {coins: [...state.voteActions.coins], event_time: state.voteActions.event_time - 1}
        } : state;
      break;
    case constant.GET_AMOUNT:
      state = {...state, amount: action.payload.data.amount};
      break;
    case constant.GET_CHAT:
      if (action.payload.status === 'success') {
        state = {...state, messages: action.payload.data.messages};
      } else state
      break;
    case constant.NEW_MESSAGE:
      state = {...state, messages:state.messages.concat([action.payload])};
      break;

  }
  return state;


};


const store = createStore(combineReducers({reducerMain, userReducer}), composeWithDevTools(applyMiddleware(thunk)));
export default store;
