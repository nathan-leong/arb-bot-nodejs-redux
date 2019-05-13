import {combineReducers} from 'redux'
import btcPriceReducer from './btcPriceReducer';
import bfxPriceReducer from './bfxPriceReducer';
import xrateReducer from './xrateReducer';

const allReducers = combineReducers({
    btcPrice: btcPriceReducer,
    bfxPrice: bfxPriceReducer,
    xRates: xrateReducer
})

export default allReducers