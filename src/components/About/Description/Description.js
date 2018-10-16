import React from 'react'
import Button from '@material-ui/core/Button';
import './Description.scss'
import img1 from './../../../assets/lap2.png'
import img2 from './../../../assets/chart.png'
export class Template extends React.Component {
  constructor() {
    super()
  }

  render() {

    return (
      <div className="wraper">
        <div className="section1">
          <div className="view view-second">
            <img
              src="http://static1.squarespace.com/static/55ac6d80e4b0a964784b2f80/t/5703eaab37013bdcee28c077/1459874476977/gw9SfTu.png"/>
            <div className="mask"></div>
            <div className="content">
              <h2>Midtown</h2>
              <p>A description of some sort between these tags. I am so cool and awesomely awesome.</p>
              <a href="#" className="info">Read More</a>
            </div>
          </div>
          <div className="view view-second">
            <img
              src="http://static1.squarespace.com/static/55ac6d80e4b0a964784b2f80/t/5703eaab37013bdcee28c077/1459874476977/gw9SfTu.png"/>
            <div className="mask"></div>
            <div className="content">
              <h2>Midtown</h2>
              <p>A description of some sort between these tags. I am so cool and awesomely awesome.</p>
              <a href="#" className="info">Read More</a>
            </div>
          </div>
          <div className="view view-second">
            <img
              src="http://static1.squarespace.com/static/55ac6d80e4b0a964784b2f80/t/5703eaab37013bdcee28c077/1459874476977/gw9SfTu.png"/>
            <div className="mask"></div>
            <div className="content">
              <h2>Midtown</h2>
              <p>A description of some sort between these tags. I am so cool and awesomely awesome.</p>
              <a href="#" className="info">Read More</a>
            </div>
          </div>
          <div className="view view-second">
            <img
              src="http://static1.squarespace.com/static/55ac6d80e4b0a964784b2f80/t/5703eaab37013bdcee28c077/1459874476977/gw9SfTu.png"/>
            <div className="mask"></div>
            <div className="content">
              <h2>Midtown</h2>
              <p>A description of some sort between these tags. I am so cool and awesomely awesome.</p>
              <a href="#" className="info">Read More</a>
            </div>
          </div>
        </div>
        <div className="section2">
          <div><img src={img1}/></div>
          <div className="sectionTitle">
            <h2>Decentralised Marketplace</h2>
            <div className="sectionP">
              <p>The end goal for VOTEMYCOIN is to create the leading decentralised
                prediction market for mainstream audiences by maintaining
                a thriving ecosystem of users looking to participate in event outcomes.
              </p>
            </div>
          </div>
        </div>
        <div className="section2 section3">
          <div className="sectionTitle">
            <h2>Analyze your Bitcoin currency</h2>
            <div className="sectionP">
              <p>
                VOTEMYCOIN makes setting up your bitcoin wallet fast and easy.
                Out search engine algorithms rate and grade all websites
                found in the internet and prove you
              </p>
              <Button color="secondary" >M O R E ...</Button>
            </div>
          </div>
          <div className="sectionImg"><img src={img2}/></div>
        </div>

      </div>

    )
  }
}

export default Template