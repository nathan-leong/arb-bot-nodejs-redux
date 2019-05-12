import {store} from '../start'
import btcPriceReducer from '../reducers/btcPriceReducer';

export const xRateCalculator = (coin) => {
    const {btcPrice, bfxPrice} = store.getState()
    if(btcPrice[coin].bid && bfxPrice[coin].bid) {

        const btcBidPrice = btcPrice[coin].bid.price
        const btcAskPrice = btcPrice[coin].ask.price
    
        const bfxBidPrice = bfxPrice[coin].bid.price
        const bfxAskPrice = bfxPrice[coin].ask.price
    
        const btcToBfxRate = bfxAskPrice/btcBidPrice
        const bfxToBtcRate = bfxBidPrice/btcAskPrice

        console.log(`BTC => BFX for coin ${coin}`, btcToBfxRate)
        console.log(`BFX => BTC for coin ${coin}`, bfxToBtcRate)
        
    }
}