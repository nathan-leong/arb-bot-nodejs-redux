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