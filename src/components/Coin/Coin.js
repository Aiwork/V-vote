import React, {Component} from 'react';
import ParticleEffectButton from 'react-particle-effect-button'
import Loading from "../Loading";
import './Coin.scss'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as mainActions from "../../Actions/MainActions";
import VoteChart from "./CoinChart";
import Chat from "../ChatComponent/Chat";

class Coin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coin: this.props.coin,
      slideIndex: 0,
      percent: 0,
      countVoteUp: 0,
      countVoteDown: 0,
      countVote: 0,
      coinData: {},
      hiddenButton: false,
      hiddenButton2: false,
    };
    this.progress = this.progress.bind(this);

  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => {
        this.props.getTime();
      },
      1000
    );
  }

  progress(v) {
    console.log("progress",v);
    this.props.setVoteAction({"coin": this.props.coin, "vote_type": v, 'token': 'S5agazgw&$'});
    let buttonUp = !this.state.hiddenButton;
    if (v === "positive") {
      this.setState({
        hiddenButton: buttonUp
      });
      setTimeout(() => this.setState({
        hiddenButton2: buttonUp
      }), 1000)
    } else {
      this.setState({
        hiddenButton2: buttonUp
      });
      setTimeout(() => this.setState({
        hiddenButton: buttonUp
      }), 1000)
    }
  };


  secondsToTime(secs) {
    if (secs) {
      let hours = Math.floor(secs / (60 * 60));
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours < 10 ? '0' + hours : hours,
        "m": minutes < 10 ? '0' + minutes : minutes,
        "s": seconds < 10 ? '0' + seconds : seconds
      };
      return <div>{obj.h}:{obj.m}:{obj.s}</div>;
    }
    return null
  }

  render() {
    let negativeVotes,positiveVotes,error_message;
    const coin = this.props.coin;
    let timer = this.props.coinsData.event_time;
    const user = this.props.user;
    let coinData = this.props.coinsData.coins.filter(mainCoin => mainCoin.coin_name === coin);
    //TODO refactor with db add positive and negative , for now there is only votes;
      console.log('this.props.coinsData.coins=',this.props.coinsData.coins);
      console.log('.coinData=',coinData);
    // if(coinData.length){
    //   negativeVotes = coinData[0].votes.negative.length;
    //   positiveVotes = coinData[0].votes.positive.length;
    // }
    let allVotes =negativeVotes +positiveVotes;
    let percentVote = negativeVotes * (100 / allVotes);
    percentVote = percentVote?percentVote:0;
    let dataChart = this.props.markets.filter(mainCoin => mainCoin.coin.coin === coin);
    if(dataChart.length){
      if(this.props.my_votes.includes(dataChart[0].coin.coin)){
        error_message = 'Limit of votes is over';
      }
    }
    return (
      <div className="mainCoin">
        <div className="mean_tab_panel">
          <div className="btc_row">
            <div className="vote_coin w-clearfix">
              <div className="time_delay">
                <div className="text-block-2">
                  {this.secondsToTime(timer)}
                </div>
              </div>
              <div className="crypto_div w-clearfix">

                <div className={`${coin} crypto_icon_div`}/>
                <div className="crypto_title_div">
                  <div className="crypto_title">{coin}</div>
                  <div className="bying_col">
                    <div>{coinData.length?coinData[0].price:null}</div>
                  </div>
                </div>
              </div>
              <div className="coin_account_row w-row">
                <div className="coin_balance_row w-col w-col-4 w-col-small-4 w-col-tiny-4">
                  <div className="balance_title">{coin}</div>
                  <div>${coinData.length?coinData[0].price:null}</div>
                </div>
                <div className="w-col w-col-4 w-col-small-4 w-col-tiny-4">
                  <div className="balance_title">DOWN</div>
                  <div>{coinData.length?percentVote.toFixed(1):null}%</div>
                </div>
                <div className="w-col w-col-4 w-col-small-4 w-col-tiny-4">
                  <div className="balance_title">All</div>
                  <div> {coinData.length?allVotes:null}</div>
                </div>
              </div>
              {
                user.logdin ? <div className="price_input_form">
                  <div className="w-form">
                    <form id="email-form" name="email-form" data-name="Email Form">
                      <input type="text" className="change_money_field w-input" maxLength="256" name="email-3"
                             data-name="Email 3"
                             placeholder="00.00" id="email-3" required=""/></form>
                    <div className="w-form-done">
                      <div>Thank you! Your submission has been received!</div>
                    </div>
                    <div className="w-form-fail">
                      <div>Oops! Something went wrong while submitting the form.</div>
                    </div>
                  </div>
                </div> : null
              }

              <div className="vote_div w-clearfix">
                {!error_message?<div className="buttonMain">
                  <ParticleEffectButton
                    className="particle-button"
                    hidden={this.state.hiddenButton2}
                    duration={1000}
                  >
                    <div onClick={() =>this.progress("negative")} className="button_vote_down w-button">
                      Down
                    </div>
                  </ParticleEffectButton>
                  <ParticleEffectButton
                    className="particle-button"
                    hidden={this.state.hiddenButton}
                    duration={1000}
                  >
                    <div onClick={() =>this.progress("positive")} className="button_vote_up w-button">Up</div>
                  </ParticleEffectButton>
                </div>:<div className="buttonMain"><h3>{error_message}</h3></div>}


              </div>
              <div className="vote_line">
                <div className="red_vote" style={{width: percentVote + "%", transition: "width 2s"}}/>
              </div>
            </div>
            <div className="graphic_chart_col">
              {dataChart.length === 1 ? <VoteChart market={dataChart[0]}/> : <Loading/>}

            </div>
            <Chat user={user}/>
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
    coinsData: state.reducerMain.voteActions,
    markets: state.reducerMain.allCoinsArrayWithData,
    user: state.userReducer,
    my_votes:state.reducerMain.vote_error_message

  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Coin)
