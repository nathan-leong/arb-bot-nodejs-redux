'use strict';

var _start = require('./start');

var _index = require('./actions/index');

var WebSocket = require('ws');


var ws = new WebSocket('wss://api.bitfinex.com/ws/');

var pairs = ['BTCUSD'];
var request = {
    pair: '',
    channel: ['ticker'],
    event: 'subscribe'
};

ws.onopen = function () {
    pairs.forEach(function (pair) {
        request.pair = pair;
        ws.send(JSON.stringify(request));
    });
};

ws.onmessage = function (msg) {
    if (msg.data.match(/\[(.*?)\]/)) {
        var priceInfo = msg.data.match(/\[(.*?)\]/)[1].split(',');
        if (priceInfo.length > 2) {
            console.log('priceInfo', priceInfo);
            _start.store.dispatch((0, _index.receivedBfxPrice)(priceInfo[1]));
            console.log('store state ', _start.store.getState());
        }
    }
};