export const receivedBtcPrice = (coin,price) => {
    return {
        type: 'BTC_UPDATE',
        payload: {coin,price}
    }
}

export const receivedBfxPrice = (coin, price) => {
    return {
        type: 'BFX_UPDATE',
        payload: {coin,price}
    }
}

export const xRatesStore = (btcToBfxXrate, bfxToBtcXrate,coinSymbol) => {
    return {
        type: 'XRATE_STORE',
        payload: {btcToBfxXrate,bfxToBtcXrate, coinSymbol}
    }
}

export const storeCoinBalance = (coin, amount, market) => {
    return {
        type: `${market}_STORE_BALANCE`,
        payload: {coin, amount}
    }
}