import {combineReducers} from 'redux'
import btcPriceReducer from './btcPriceReducer';
import bfxPriceReducer from './bfxPriceReducer';

const allReducers = combineReducers({
    btcPrice: btcPriceReducer,
    bfxPrice: bfxPriceReducer,
})

export default allReducers