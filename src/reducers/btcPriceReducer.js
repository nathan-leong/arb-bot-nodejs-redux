const initialState = {
    btcprice:null
  };

export default function(state=initialState, action) {
    switch (action.type){
        case 'BTC_UPDATE':
            state.btcprice = action.payload;
            break
    }
    return state;
}