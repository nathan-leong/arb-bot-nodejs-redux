import CONSTANTS from '../constants'

const initialState = {}

CONSTANTS.COINS.forEach(coin => {
    initialState[coin] = {price: null, vol: null}
})
export default function(state=initialState, action) {
    switch (action.type){
        case 'BTC_UPDATE':
            state[action.payload.coin] = action.payload.price;
            break
    }
    return state;
}