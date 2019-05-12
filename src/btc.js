import WebSocket from 'ws'
import {store} from './start'
import {receivedBtcPrice} from './actions/index'
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
    console.log('msg',msg.bids[0]);
    store.dispatch(receivedBtcPrice(msg.bids[0]))
    console.log('store state ',store.getState());

};

export default ws;