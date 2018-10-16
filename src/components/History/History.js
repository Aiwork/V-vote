import React, {Component} from 'react';
import './History.scss'
import {bindActionCreators} from "redux";
import * as mainActions from "../../Actions/MainActions";
import {connect} from "react-redux";
import Page404 from './../page404/page404'
import Loading from "../Loading";

class History extends Component {
  constructor(props, context) {
    super(props, context);
    if (this.props.user.logdin) {
      this.props.getHistory(this.props.user)
    }
  }

  render() {
    let user = this.props.user;
    if (user.logdin) {
      return (
        <div className="mainHistory">
          {user.myHistory?<div className="history_container w-container">
            <h2 className="form_title">History</h2>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3 w-col-tiny-6"><img src="./../../assets/images/btc_big_icon.svg"
                                                                          className="coin_col img"/>
                  <div className="text-block-3">BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3 w-col-tiny-6"><img
                  src="./../../assets/images/white_arrow.svg"
                  className="arrow_column arr"/></div>
                <div className="column w-col w-col-3 w-col-tiny-6">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3 w-col-tiny-6">
                  <div>1 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/btc_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="loose_block">loose</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>20 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/xmr_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>10 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/btc_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="loose_block">loose</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>11 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/xmr_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>2 hour ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/dash_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>4 hour ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/btc_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="loose_block">loose</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>20 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/xmr_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>10 min ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/dash_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>4 hour ago</div>
                </div>
              </div>
            </div>
            <div className="history_row">
              <div className="history_content_row w-row">
                <div className="coin_col w-col w-col-3"><img src="./../../assets/images/xmr_big_icon.svg"
                                                             className="coin_col img"/>
                  <div>BCH 0.035</div>
                </div>
                <div className="arrow_column w-col w-col-3"><img src="./../../assets/images/white_arrow.svg"
                                                                 className="arrow_column arr"/></div>
                <div className="column w-col w-col-3">
                  <div className="win_block">WIN</div>
                </div>
                <div className="coin_col2 w-col w-col-3">
                  <div>2 hour ago</div>
                </div>
              </div>
            </div>
            <a href="log-in.html" className="show_more_button  w-button">Show more...</a></div>:<Loading/>}
        </div>
      );
    } else {
      return <Page404/>
    }

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
    user: state.userReducer
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(History);
