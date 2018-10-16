import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loading from "../../components/Loading";
import './CoinPanel.scss'
class CoinPanel extends Component {
  constructor(props) {
    super(props);
  }


  render(){
    const coins = this.props.coins;
    if(coins.length=== 10){
      return <div className="coin_panel w-clearfix animated fadeInUp delay-2s">
        {coins.map((coin, i) => {
          return <Link className="item1 w-inline-block" key={i} to={"/"+coin.coin_name}>
            <div className={coin.coin_name}/>
            <div className="item_txt">{coin.coin_name}</div>
            <div className="item_price">{coin.price}</div>
          </Link>
        })}
      </div>
    }
    return null
  }

}
export default CoinPanel
