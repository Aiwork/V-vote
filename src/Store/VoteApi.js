import axios from 'axios';

export default class VoteApi {

  static get_coins_cryptocompare(coin) {
    return axios.get('https://min-api.cryptocompare.com/data/histoday?' +
      'aggregate=1&e=CCCAGG&extraParams=CryptoCompare&fsym=' + coin + '&' +
      'limit=30&tryConversion=false&tsym=USD')

  }

  static get_vote_action() {
    return axios.get('api/coins')
  }

  static get_history(token) {
    let headers = {'Content-Type': 'application/json', 'Authorization': `JWT ${token}`};
    return axios.get('api/user_history',{headers: headers})
  }

  static get_amount() {
    return axios.get('api/get_amount')
  }

  static set_vote_action(vote, token) {
    let headers = {'Content-Type': 'application/json', 'Authorization': `JWT ${token}`};
    return axios.post('api/vote_actions', vote, {
      headers: headers
    })
  }

  static set_token(user) {
    return axios.post('api/token', user, {
      headers: {'Content-Type': 'text/plain'}
    })
  }

  static register_user(user) {
    return axios.post('api/register', user, {
      headers: {'Content-Type': 'text/plain'}
    })
  }

  static get_chat() {
    return axios.get('api/messages', {
      headers: {'Content-Type': 'text/plain'}
    })
  }

  static verify_token(token) {
    return fetch('api/verify_token', {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': `JWT ${token}`},
      credentials: 'include'
    }).then(response => response.json())
  }
}