import React, {Component} from 'react';
import '../../containers/CoinPanel/CoinPanel.scss'

class MainPage extends Component {
  render() {
    return (
      <div className="mean_tab_panel">
        <div className="hero_title_div animated bounceInLeft">
          <h1 className="hero_title  ">V-Vote<br/>Coming soon</h1>
          <div className="hero_explainer">
            V-vote could help us avoid legal problems in the future by distinguishing ourselves from questionable prediction platforms
            <p>We strengthened our plan to include a decentralized voting platform like the Gallup Polls with more security and options.</p>
          </div>
        </div>
      </div>

    )
  }
}


export default MainPage
