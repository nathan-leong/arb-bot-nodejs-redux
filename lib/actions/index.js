'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var receivedBtcPrice = exports.receivedBtcPrice = function receivedBtcPrice(coin, price) {
    return {
        type: 'BTC_UPDATE',
        payload: { coin: coin, price: price }
    };
};

var receivedBfxPrice = exports.receivedBfxPrice = function receivedBfxPrice(coin, price) {
    return {
        type: 'BFX_UPDATE',
        payload: { coin: coin, price: price }
    };
};

var xRatesStore = exports.xRatesStore = function xRatesStore(btcToBfxXrate, bfxToBtcXrate, coinSymbol) {
    return {
        type: 'XRATE_STORE',
        payload: { btcToBfxXrate: btcToBfxXrate, bfxToBtcXrate: bfxToBtcXrate, coinSymbol: coinSymbol }
    };
};