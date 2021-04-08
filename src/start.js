import {createStore} from 'redux'
import bfxSocket from './bfx'
import btcSocket from './btc'
import allReducers from './reducers/index'
import {heartbeat} from './utils/utils'
import {btcmarketsTrade, btcMarketsBalance} from './utils/authBTC'
import {bfxmarketsTrade} from './utils/authBFX'
require('dotenv').config()

export const store = createStore(allReducers);
btcMarketsBalance()
setInterval(heartbeat,3600000)
//setInterval(() => console.log(store.getState().bfxPrice),5000)