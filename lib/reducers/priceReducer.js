'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'BTC_UPDATE':
            state.btcprice = action.payload;
            break;
    }
    return state;
};

var initialState = {
    btcprice: null
};