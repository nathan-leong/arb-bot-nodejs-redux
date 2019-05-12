'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _start = require('./start');

var _index = require('./actions/index');

var _utils = require('./utils/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ws = new _ws2.default('wss://socket.btcmarkets.net/v2');

var marketIds = ['BTC-AUD'];
var channels = ['orderbook'];
var request = {
    marketIds: marketIds,
    channels: channels,
    messageType: 'subscribe'
};

ws.onopen = function () {
    ws.send(JSON.stringify(request));
};

ws.onmessage = function (msg) {
    msg = JSON.parse(msg.data);
    var bid = {
        price: msg.bids[0][0],
        vol: msg.bids[0][1]
    };
    var ask = {
        price: msg.asks[0][0],
        vol: msg.asks[0][1]
    };
    var price = {
        bid: bid,
        ask: ask
    };
    _start.store.dispatch((0, _index.receivedBtcPrice)('BTC', price));
    console.log('BTCmarkets store state ', _start.store.getState().btcPrice);
    (0, _utils.xRateCalculator)('BTC');
};

exports.default = ws;