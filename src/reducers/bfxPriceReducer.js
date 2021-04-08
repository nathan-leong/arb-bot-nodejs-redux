import CONSTANTS from '../constants'

const initialState = {
    balance: {},
    prices: {}
};

CONSTANTS.COINS.forEach(coin => {
    initialState.prices[coin] = {price: null, vol: null}
})
export default function(state=initialState, action) {
    switch (action.type){
        case 'BFX_UPDATE':
            state.prices[action.payload.coin] = action.payload.price;
            break
        case 'BITFINEX_STORE_BALANCE':
        state.balance[action.payload.coin] = action.payload.amount;
        break
    }
    return state;
}