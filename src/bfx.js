const WebSocket = require('ws')
import {store} from './start'
import {receivedBfxPrice} from './actions/index'

const ws = new WebSocket('wss://api.bitfinex.com/ws/')

const pairs = ['BTCUSD']
var request = {
    pair:'',
    channel: ['ticker'],
    event: 'subscribe',
}

ws.onopen = () => {
    pairs.forEach(pair => {
        request.pair = pair
        ws.send(JSON.stringify(request));
    });
};

ws.onmessage = (msg) => {
    if (msg.data.match(/\[(.*?)\]/)){
        const priceInfo = msg.data.match(/\[(.*?)\]/)[1].split(',')
        if (priceInfo.length > 2) {
            console.log('priceInfo',priceInfo)
            store.dispatch(receivedBfxPrice(priceInfo[1]))
            console.log('store state ',store.getState());

        }
    }
};