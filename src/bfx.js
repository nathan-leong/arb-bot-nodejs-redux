const WebSocket = require('ws')
import {store} from './start'
import {receivedBfxPrice} from './actions/index'
import {xRateCalculator} from './utils/utils'
import CONSTANTS from './constants'

const ws = new WebSocket('wss://api.bitfinex.com/ws/')

const channels = {}
let pairs = []
CONSTANTS.COINS.forEach(coin => {
    channels[coin] = null
    pairs.push(`${coin}USD`)
})

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
    const priceInfo = JSON.parse(msg.data)
    let coinSymbol = '';
   if (priceInfo.pair) {
        coinSymbol = priceInfo.pair.match(/.+?(?=USD)/)
        if (!channels[coinSymbol]){
            channels[coinSymbol] = priceInfo.chanId
        }
       
   }
    else {
        for (var key in channels){
            if (channels[key] == priceInfo[0]){
                coinSymbol = key
            }
        }
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
            store.dispatch(receivedBfxPrice(coinSymbol,price))
            //console.log('BFX store state ',store.getState().bfxPrice);
            xRateCalculator(coinSymbol)

        }
    }
};