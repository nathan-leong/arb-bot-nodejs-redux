'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redux = require('redux');

var _btcPriceReducer = require('./btcPriceReducer');

var _btcPriceReducer2 = _interopRequireDefault(_btcPriceReducer);

var _bfxPriceReducer = require('./bfxPriceReducer');

var _bfxPriceReducer2 = _interopRequireDefault(_bfxPriceReducer);

var _xrateReducer = require('./xrateReducer');

var _xrateReducer2 = _interopRequireDefault(_xrateReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var allReducers = (0, _redux.combineReducers)({
    btcPrice: _btcPriceReducer2.default,
    bfxPrice: _bfxPriceReducer2.default,
    xRates: _xrateReducer2.default
});

exports.default = allReducers;