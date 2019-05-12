const WebSocket = require('ws');
const ws = new WebSocket('wss://socket.btcmarkets.net/v2');

const marketIds = ['BTC-AUD','XRP-AUD']
const channels = ['tick']
var request = {
    marketIds:marketIds,
    channels: channels,
    messageType: 'subscribe'
}

ws.onopen = () => {
    ws.send(JSON.stringify(request));
};

ws.onmessage = (msg) => {
    console.log(msg.data);
};