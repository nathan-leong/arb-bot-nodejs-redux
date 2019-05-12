export const receivedBtcPrice = price => {
    console.log('actioned price ', price)
    return {
        type: 'BTC_UPDATE',
        payload: price
    }
}

export const receivedBfxPrice = price => {
    console.log('actioned price ', price)
    return {
        type: 'BFX_UPDATE',
        payload: price
    }
}