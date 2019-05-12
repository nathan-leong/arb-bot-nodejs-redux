import {createStore} from 'redux'
import bfxSocket from './bfx'
import btcSocket from './btc'
import allReducers from './reducers/index'

export const store = createStore(allReducers);

