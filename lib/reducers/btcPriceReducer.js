'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'BTC_UPDATE':
            state[action.payload.coin] = action.payload.price;
            break;
    }
    return state;
};

var initialState = {
    BTC: { price: null, vol: null }
};