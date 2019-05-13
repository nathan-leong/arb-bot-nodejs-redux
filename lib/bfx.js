'use strict';

var _start = require('./start');

var _index = require('./actions/index');

var _utils = require('./utils/utils');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WebSocket = require('ws');


var ws = new WebSocket('wss://api.bitfinex.com/ws/');

var channels = {};
var pairs = [];
_constants2.default.COINS.forEach(function (coin) {
    channels[coin] = null;
    pairs.push(coin + 'USD');
});

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
    var priceInfo = JSON.parse(msg.data);
    var coinSymbol = '';
    if (priceInfo.pair) {
        coinSymbol = priceInfo.pair.match(/.+?(?=USD)/);
        if (!channels[coinSymbol]) {
            channels[coinSymbol] = priceInfo.chanId;
        }
    } else {
        for (var key in channels) {
            if (channels[key] == priceInfo[0]) {
                coinSymbol = key;
            }
        }
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
            _start.store.dispatch((0, _index.receivedBfxPrice)(coinSymbol, price));
            //console.log('BFX store state ',store.getState().bfxPrice);
            (0, _utils.xRateCalculator)(coinSymbol);
        }
    }
};