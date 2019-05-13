import CONSTANTS from '../constants'

const initialState = {
    btcToBfx: {},
    bfxToBtc: {}
};
CONSTANTS.COINS.forEach(coin => {
    initialState.btcToBfx[coin] = null;
    initialState.bfxToBtc[coin] = null;
})
export default function(state=initialState, action) {
    switch (action.type){
        case 'XRATE_STORE':
            state.btcToBfx[action.payload.coinSymbol] = action.payload.btcToBfxXrate;
            state.bfxToBtc[action.payload.coinSymbol] = action.payload.bfxToBtcXrate;
            break
    }
    return state;
}