'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _start = require('./start');

var _index = require('./actions/index');

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = new _ws2.default('wss://socket.btcmarkets.net/v2');

var marketIds = [];
_constants2.default.COINS.forEach(function (coin) {
    marketIds.push(coin + '-AUD');
});
var request = {
    marketIds: marketIds,
    channels: ['orderbook'],
    messageType: 'subscribe'
};

ws.onopen = function () {
    ws.send(JSON.stringify(request));
};

ws.onmessage = function (msg) {
    msg = JSON.parse(msg.data);
    var coinSymbol = msg.marketId.match(/.+?(?=-AUD)/);
    var bid = {
        price: parseFloat(msg.bids[0][0]),
        vol: parseFloat(msg.bids[0][1])
    };
    var ask = {
        price: parseFloat(msg.asks[0][0]),
        vol: parseFloat(msg.asks[0][1])
    };
    var price = {
        bid: bid,
        ask: ask
    };
    _start.store.dispatch((0, _index.receivedBtcPrice)(coinSymbol, price));
    console.log('BTCmarkets store state ', _start.store.getState().btcPrice);
    (0, _utils.xRateCalculator)(coinSymbol);
};

exports.default = ws;