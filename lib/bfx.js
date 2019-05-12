'use strict';

var _start = require('./start');

var _index = require('./actions/index');

var _utils = require('./utils/utils');

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
            var bid = {
                price: priceInfo[1],
                vol: priceInfo[2]
            };
            var ask = {
                price: priceInfo[3],
                vol: priceInfo[4]
            };
            var price = {
                bid: bid,
                ask: ask
            };
            console.log('bid', bid);
            _start.store.dispatch((0, _index.receivedBfxPrice)('BTC', price));
            console.log('BFX store state ', _start.store.getState().bfxPrice);
            (0, _utils.xRateCalculator)('BTC');
        }
    }
};