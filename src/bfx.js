const WebSocket = require('ws')
import {store} from './start'
import {receivedBfxPrice} from './actions/index'
import {xRateCalculator} from './utils/utils'

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
            const bid = {
                price: priceInfo[1],
                vol: priceInfo[2]
            }
            const ask = {
                price: priceInfo[3],
                vol: priceInfo[4]
            }
            const price = {
                bid,
                ask
            }
            console.log('bid',bid)
            store.dispatch(receivedBfxPrice('BTC',price))
            console.log('BFX store state ',store.getState().bfxPrice);
            xRateCalculator('BTC')

        }
    }
};