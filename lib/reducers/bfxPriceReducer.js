'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'BFX_UPDATE':
            state.bfxprice = action.payload;
            break;
    }
    return state;
};

var initialState = {
    bfxprice: null
};