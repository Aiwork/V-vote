import * as actionTypes from './../Store/constant';
import VoteApi from "../Store/VoteApi";

export function getCoinListFromcryptocompare(coin) {
  return function (dispatch) {
    return VoteApi.get_coins_cryptocompare(coin).then((res) => dispatch({
        type: actionTypes.SET_VOTE_LIST,
        payload: [res.data['Data'], coin]
      })
    )
  }
}

export function setVoteAction(vote) {
  return async (dispatch) => {
    let user = localStorage.getItem('user');
    if (user) {
      let data = JSON.parse(user);
      const myVotes = await VoteApi.set_vote_action(vote, data.token);
      if (myVotes.data.data.error) {
        console.log('myVotes', myVotes.data.data.error);
        return dispatch({
          type: actionTypes.SET_VOTE_ACTION_ERROR_MAX,
          payload: vote.coin
        })
      } else {
        localStorage.setItem("myVotes", JSON.stringify(myVotes.data.data.coins));
        return dispatch({
          type: actionTypes.SET_VOTE_ACTION,
          payload: myVotes.data.data.coins
        })
      }
    }


  }
}

export function loginUser(user) {
  return function (dispatch) {
    return VoteApi.set_token(user).then((res) => {
      let body = res.data;
      let newUser = user;
      if (body.data !== "Unauthorized" && body !== null) {
        let token = body.data.token;
        localStorage.setItem('user', JSON.stringify({'token': token, 'user': user.username}));
        newUser.userToken = token;
      } else {
        return dispatch({
          type: actionTypes.ERROR_LOGIN,
        })
      }
      return dispatch({
        type: actionTypes.SET_TOKEN,
        payload: newUser
      })
    }).catch(function (error) {
      console.log('ERR here:', error.response.data.data);
      return dispatch({
        type: actionTypes.ERROR_LOGIN,
      })
    })
  }
}

export function registerUser(user) {
  return function (dispatch) {
    return VoteApi.register_user(user).then((res) => {
      let body = res.data;
      if (body.status === "success") {
        return dispatch({
          type: actionTypes.REGISTER_USER,
        })
      }
      else {
        return dispatch({
          type: actionTypes.REGISTER_USER_ERROR,
        })
      }
    })
  }
}

export function getToken() {
  let user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user).token;
  } else {
    return null;
  }
}

export function verifyUser() {
  return function (dispatch) {
    let user = localStorage.getItem('user');
    if (user) {
      let data = JSON.parse(user);
      return VoteApi.verify_token(data.token).then((res) => {
        if (res.status === "success" && res !== null) {
          return dispatch({
            type: actionTypes.VERIFIED_TOKEN,
            payload: data
          })
        }
        else {
          return dispatch({
            type: actionTypes.UNVERIFIED_TOKEN,
            payload: data
          })
        }
      }).catch(function (error) {
        console.log('ERR here:', error);
        return dispatch({
          type: actionTypes.UNVERIFIED_TOKEN,
        })
      })
    } else {
      return dispatch({
        type: actionTypes.UNVERIFIED_TOKEN,
      })
    }
  }
}

export function getVoteAction() {
  return function (dispatch) {
    return VoteApi.get_vote_action().then((res) => {
        dispatch({
          type: actionTypes.GET_ACTIONS,
          payload: res.data.data
        })
      }
    )
  }
}

export function getAmount() {
  return function (dispatch) {
    return VoteApi.get_amount().then((res) => dispatch({
        type: actionTypes.GET_AMOUNT,
        payload: res.data
      })
    )
  }
}


export function getTime() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.TIMER,
    })
  }
}

export function signout() {
  localStorage.removeItem('user');
  return function (dispatch) {
    return dispatch({
      type: actionTypes.SIGNOUT,
    })
  }
}

export function onShowCpanel() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.SHOW_CPANEL,
    })
  }
}

export function getHistory(user) {
  return async (dispatch) => {
    let newHistory = await VoteApi.get_history(user.userToken);
    if(newHistory.data){
      return dispatch({
        type: actionTypes.SET_HISTORY,
        payload: newHistory.data
      })
    }
  }
}

export function notLoginPage() {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.NOT_SHOW_CPANEL,
    })
  }
}

export function getChatMessage() {
  return function (dispatch) {
    return VoteApi.get_chat().then((res) => dispatch({
        type: actionTypes.GET_CHAT,
        payload: res.data
      })
    )
  }
}

export function newChatMessage(message) {
  return function (dispatch) {
    return dispatch({
      type: actionTypes.NEW_MESSAGE,
      payload: message

    })
  }
}



