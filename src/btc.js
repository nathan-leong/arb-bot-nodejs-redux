import WebSocket from 'ws'
import {store} from './start'
import {receivedBtcPrice} from './actions/index'
import {xRateCalculator} from './utils/utils'
const ws = new WebSocket('wss://socket.btcmarkets.net/v2');

const marketIds = ['BTC-AUD']
const channels = ['orderbook']
var request = {
    marketIds:marketIds,
    channels: channels,
    messageType: 'subscribe'
}

ws.onopen = () => {
    ws.send(JSON.stringify(request));
};

ws.onmessage = (msg) => {
    msg = JSON.parse(msg.data)
    const bid = {
        price: msg.bids[0][0],
        vol: msg.bids[0][1]
    }
    const ask = {
        price: msg.asks[0][0],
        vol: msg.asks[0][1]
    }
    const price = {
        bid,
        ask
    }
    store.dispatch(receivedBtcPrice('BTC',price))
    console.log('BTCmarkets store state ',store.getState().btcPrice);
    xRateCalculator('BTC')
};

export default ws;