'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.store = undefined;

var _redux = require('redux');

var _bfx = require('./bfx');

var _bfx2 = _interopRequireDefault(_bfx);

var _btc = require('./btc');

var _btc2 = _interopRequireDefault(_btc);

var _index = require('./reducers/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = exports.store = (0, _redux.createStore)(_index2.default);