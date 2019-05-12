const WebSocket = require('ws')
const ws = new WebSocket('wss://api.bitfinex.com/ws/')

const pairs = ['BTCUSD','ETHUSD']
const channels = ['ticker']
var request = {
    pair:'',
    channel: channels,
    event: 'subscribe'
}

ws.onopen = () => {
    pairs.forEach(pair => {
        console.log('pair',pair)
        request.pair = pair
        ws.send(JSON.stringify(request));
    });
};

ws.onmessage = (msg) => {
    console.log(msg.data);
};