'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'BFX_UPDATE':
            state[action.payload.coin] = action.payload.price;
            break;
    }
    return state;
};

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {};

_constants2.default.COINS.forEach(function (coin) {
    initialState[coin] = { price: null, vol: null };
});