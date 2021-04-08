'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'BTC_UPDATE':
            state.prices[action.payload.coin] = action.payload.price;
            break;
        case 'BTCMARKETS_STORE_BALANCE':
            state.balance[action.payload.coin] = action.payload.amount;
            break;
    }
    return state;
};

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
    balance: {},
    prices: {}
};

_constants2.default.COINS.forEach(function (coin) {
    initialState.prices[coin] = { price: null, vol: null };
});