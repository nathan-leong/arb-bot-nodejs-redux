import WebSocket from 'ws'
import {store} from './start'
import {receivedBtcPrice} from './actions/index'
import CONSTANTS from './constants'

import {xRateCalculator} from './utils/utils'
const ws = new WebSocket('wss://socket.btcmarkets.net/v2');

let marketIds = []
CONSTANTS.COINS.forEach(coin => {
    marketIds.push(`${coin}-AUD`)
})
var request = {
    marketIds:marketIds,
    channels: ['orderbook'],
    messageType: 'subscribe'
}

ws.onopen = () => {
    ws.send(JSON.stringify(request));
};

ws.onmessage = (msg) => {
    msg = JSON.parse(msg.data)
    const coinSymbol = msg.marketId.match(/.+?(?=-AUD)/)
    const bid = {
        price: parseFloat(msg.bids[0][0]),
        vol: parseFloat(msg.bids[0][1])
    }
    const ask = {
        price: parseFloat(msg.asks[0][0]),
        vol: parseFloat(msg.asks[0][1])
    }
    const price = {
        bid,
        ask
    }
    store.dispatch(receivedBtcPrice(coinSymbol,price))
    console.log('BTCmarkets store state ',store.getState().btcPrice);
    xRateCalculator(coinSymbol)
};

export default ws;