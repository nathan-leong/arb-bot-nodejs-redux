'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _ws = require('ws');

var _ws2 = _interopRequireDefault(_ws);

var _start = require('./start');

var _index = require('./actions/index');

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
    console.log('msg', msg.bids[0]);
    _start.store.dispatch((0, _index.receivedBtcPrice)(msg.bids[0]));
    console.log('store state ', _start.store.getState());
};

exports.default = ws;