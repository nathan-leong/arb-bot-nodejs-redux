'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var receivedBtcPrice = exports.receivedBtcPrice = function receivedBtcPrice(price) {
    console.log('actioned price ', price);
    return {
        type: 'BTC_UPDATE',
        payload: price
    };
};

var receivedBfxPrice = exports.receivedBfxPrice = function receivedBfxPrice(price) {
    console.log('actioned price ', price);
    return {
        type: 'BFX_UPDATE',
        payload: price
    };
};