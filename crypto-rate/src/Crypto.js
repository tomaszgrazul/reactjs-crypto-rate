import React, {Component} from 'react';
import './Crypto.css';
import axios from 'axios';

import CryptoList from './CryptoList';

class Crypto extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cryptoList: []
        };
    }

    componentDidMount() {
        this.getCryptoData();
    }

    getCryptoData = () => {
        axios
        .get('https://blockchain.info/ticker').then(res => {

            const tickers = res.data;

            this.setState((state) => {
                let newCryptoList = [];
                for (const [ticker, cryptoRate] of Object.entries(tickers)) {
                    let newCryptoObj = {
                        currency: ticker,
                        symbol: cryptoRate.symbol,
                        buy: cryptoRate.buy,
                        sell: cryptoRate.sell,
                        lastRate: cryptoRate.last  
                    }

                    newCryptoList.push(newCryptoObj);
                }
                return ({
                    cryptoList: newCryptoList
                })
            });
            console.log('axios', res.data);
        })
        .catch((error) => {
            console.error('Error', error);    
        });
    }

 
    render() {

        return (
            <div className="Crypto">
                <CryptoList cryptoList={this.state.cryptoList}/>
            </div>
        );
    }
}

export default Crypto;