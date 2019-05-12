const initialState = {
    BTC: {price: null, vol: null}
  };

export default function(state=initialState, action) {
    switch (action.type){
        case 'BFX_UPDATE':
            state[action.payload.coin] = action.payload.price;
            break
    }
    return state;
}