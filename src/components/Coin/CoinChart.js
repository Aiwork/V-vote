import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import './CoinChart.scss'

class CoinChart extends Component {

  render() {
    const market = this.props.market;
    return (
      <div className="animated fadeIn">
        <div key={market.coin.coin} className="mainCoinChart">
          <div id={market.coin.coin} className="chart-wrapper">
            <Line data={market.line} className="linemy"
                  options={{
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [{
                        display: false,
                        // lineHeight: '0.5'
                      }]
                    }
                  }}
            />
          </div>
        </div>
      </div>

    );
  }


}

export default CoinChart