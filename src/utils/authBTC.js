const crypto = require('crypto');
const WebSocket = require('ws');
require("isomorphic-fetch")

const CONSTANTS = require('../constants')
import {store} from '../start'
import {storeCoinBalance} from '../actions'

const key = process.env.BTC_KEY;
const secret = process.env.BTC_SECRET;
const ws = new WebSocket('wss://socket.btcmarkets.net/v2');

const now = Date.now();
const strToSign =  "/users/self/subscribe" + "\n" + now;
const signature = signMessage(secret, strToSign);

var request = {
    marketIds:['BTC-AUD'],
    channels: ['fundChange', 'heartbeat'],
    key: key,
    signature: signature,
    timestamp: now,
    messageType: 'subscribe'
}

ws.on('open', function open() {
    ws.send(JSON.stringify(request));
});

ws.on('message', function incoming(data) {
   // console.log(data);
});

function signMessage(secret, message) {
    var key = Buffer.from(secret, 'base64');
    var hmac = crypto.createHmac('sha512', key);
    var signature = hmac.update(message).digest('base64');
    return signature;
}
 
export const btcmarketsTrade = (coinSymbol, amount, tradeType) => {
    const payload = {
        "currency": "AUD",
        "instrument": coinSymbol,
        "price": 1,
        "volume": amount,
        "orderSide": tradeType,
        "ordertype": "Market",
        "clientRequestId": "1"
    }
    const now = Date.now();
    const strToSign =  "/order/create" + "\n" + now + "\n" + JSON.stringify(payload);
    const signature = signMessage(secret, strToSign);
    fetch('https://api.btcmarkets.net/order/create', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "UTF-8",
            "Content-Type": "application/json",
            "apikey": key,
            "timestamp": now,
            "signature": signature
        },
        body: JSON.stringify(payload)
    }).then(response => response.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));

}

export const btcMarketsBalance = () => {
    const now = Date.now();
    const strToSign =  "/account/balance" + "\n" + now + "\n";
    const signature = signMessage(secret, strToSign);
    fetch('https://api.btcmarkets.net/account/balance', {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Charset": "UTF-8",
            "Content-Type": "application/json",
            "apikey": key,
            "timestamp": now,
            "signature": signature
        },
    }).then(response => response.json())
        .then(response => {
            //console.log('Success:', response)
            response.forEach(coin=> {
                if (CONSTANTS.COINS.includes(coin.currency) || coin.currency == 'AUD'){
                    store.dispatch(storeCoinBalance(coin.currency,coin.balance/(Math.pow(10,8)),CONSTANTS.BTCMARKETS))
                }
            });
        })
        .catch(error => console.error('Error:', error));

}
