const crypto = require('crypto-js')
const WebSocket = require('ws');
require("isomorphic-fetch")
const CONSTANTS = require('../constants');
import {store} from '../start';
import {storeCoinBalance} from '../actions'

const ws = new WebSocket('wss://api.bitfinex.com/ws/')

const apiKey = process.env.BFX_KEY
const apiSecret = process.env.BFX_SECRET

const authNonce = Date.now() * 1000
const authPayload = 'AUTH' + authNonce
const authSig = crypto
	.HmacSHA384(authPayload, apiSecret)
	.toString(crypto.enc.Hex)

const request = {
  apiKey,
  authSig,
  authNonce,
  authPayload,
  event: 'auth'
}

ws.on('open', function open() {
    ws.send(JSON.stringify(request));
});

ws.on('message', function incoming(data) {
   // console.log(data);
    if(/ws/.test(data)){
        const regex = /\[(.*)\]/
        const coins = data.match(regex)[1].match(regex)[1]
        const coinsArray = coins.match(/\[(.*?)\]/g)
        console.log(coinsArray)
        coinsArray.forEach(coinInfo => {
            let splitCoinInfo = coinInfo.split(',')
            let coinSymbol = splitCoinInfo[1].match(/([A-Z]+)/)[1]
            if (CONSTANTS.COINS.includes(coinSymbol) || coinSymbol == 'USD'){
                store.dispatch(storeCoinBalance(coinSymbol,parseFloat(splitCoinInfo[2]),CONSTANTS.BITFINEX))
            }
        })
    }

});

export const bfxmarketsTrade = (coinSymbol, amount, tradeType) => {
    
    const orderOne = {
        symbol: `${coinSymbol}USD`,
        amount: amount,
        price: '1',
        exchange: 'bitfinex',
        side: tradeType == 'Bid' ? 'buy' : 'sell',
        type: 'exchange market'
    }
    const orderTwo = {
        symbol: `XRPUSD`,
        amount: amount,
        price: '1',
        exchange: 'bitfinex',
        side: tradeType == 'Bid' ? 'buy' : 'sell',
        type: 'exchange market'
    }
    const orders = [orderOne,orderTwo]

    let payload = {
        request: '/v1/order/new/multi',
        nonce: Date.now().toString(),
        orders: orders
    }
    payload = Buffer.from(JSON.stringify(payload)).toString('base64')
    const signature = crypto
	.HmacSHA384(payload, apiSecret)
    .toString(crypto.enc.Hex);
    
    fetch('https://api.bitfinex.com/v1/order/new/multi', {
        method: "POST",
        headers: {
            "X-BFX-APIKEY": apiKey,
            "X-BFX-PAYLOAD": payload,
            "X-BFX-SIGNATURE": signature,
            
        },
    }).then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

}
