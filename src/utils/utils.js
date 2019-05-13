import {store} from '../start'
import {xRatesStore} from '../actions'
import CONSTANTS from '../constants'

export const xRateCalculator = (coin) => {
    const {btcPrice, bfxPrice} = store.getState()
    if(btcPrice[coin].bid && bfxPrice[coin].bid) {

        const btcBidPrice = btcPrice[coin].bid.price
        const btcAskPrice = btcPrice[coin].ask.price
    
        const bfxBidPrice = bfxPrice[coin].bid.price
        const bfxAskPrice = bfxPrice[coin].ask.price
    
        const btcToBfxRate = bfxAskPrice/btcBidPrice
        const bfxToBtcRate = bfxBidPrice/btcAskPrice

        store.dispatch(xRatesStore(btcToBfxRate, bfxToBtcRate, coin))
        //console.log('XRATES store state ',store.getState().xRates);

        generateMaxGain()
    }
}

export const generateMaxGain = () => {
    let minBtcToBfx = 1;
    let btcToBfxCoin = null;
    let temp;
    for (var coinSymbol in store.getState().xRates.btcToBfx){
        temp = store.getState().xRates.btcToBfx[coinSymbol]
        if (temp == null) {return}

        if (temp < minBtcToBfx) {
            minBtcToBfx = temp; 
            btcToBfxCoin = coinSymbol;
        }
    }
    //console.log(`${btcToBfxCoin} has the lowest rate at ${minBtcToBfx}`)

    let maxBfxToBtc = 0;
    let bfxToBtcCoin = null;
    for (var coinSymbol in store.getState().xRates.bfxToBtc){
        temp = store.getState().xRates.bfxToBtc[coinSymbol]
        if (temp > maxBfxToBtc) {
            maxBfxToBtc = temp; 
            bfxToBtcCoin = coinSymbol;
        }
    }
    //console.log(`${bfxToBtcCoin} has the highest rate at ${maxBfxToBtc}`)
    const maxGain = (1-minBtcToBfx/maxBfxToBtc);
    //console.log(`Max gain = ${100*maxGain}%`)

    if(maxGain > CONSTANTS.GAIN_THRESHOLD){transaction(btcToBfxCoin,bfxToBtcCoin,maxGain)}
}

const transaction = (btcCoin,bfxCoin,maxGain) => {
    let bidPriceInfo = store.getState().btcPrice[btcCoin].bid
    let bidPrice = bidPriceInfo.price;
    let bidVol = bidPriceInfo.vol;
    let askPriceInfo = store.getState().bfxPrice[btcCoin].ask
    let askPrice = askPriceInfo.price;
    let askVol = askPriceInfo.vol;
    const maxTransactableBtcToBfx = Math.min(bidPrice*bidVol,askPrice*askVol*(1-CONSTANTS.BTC_TRANSACTION_FEE))

    //console.log(`Max transactable for btc => bfx $${maxTransactableBtcToBfx}`)

     bidPriceInfo = store.getState().bfxPrice[bfxCoin].bid
     bidPrice = bidPriceInfo.price;
     bidVol = bidPriceInfo.vol;
     askPriceInfo = store.getState().btcPrice[bfxCoin].ask
     askPrice = askPriceInfo.price;
     askVol = askPriceInfo.vol;
    const maxTransactableBfxToBtc = Math.min(bidPrice*bidVol,askPrice*askVol*(1-CONSTANTS.BFX_TRANSACTION_FEE))

    //console.log(`Max transactable for bfx => btc $${maxTransactableBfxToBtc}`)
    const maxTransactable = Math.min(maxTransactableBfxToBtc,maxTransactableBtcToBfx)
    if(100*maxGain > 0.5){
        console.log(new Date())
        console.log(`Max gain = ${100*maxGain}%`)
        console.log(`Max Transactable = $${maxTransactable}`)
        const potentialProfit = maxTransactable*maxGain
        console.log(`Potential Profit = $${potentialProfit}`)
    }
}