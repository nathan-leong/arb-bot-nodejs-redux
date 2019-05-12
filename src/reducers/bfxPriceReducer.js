const initialState = {
    bfxprice:null
  };

export default function(state=initialState, action) {
    switch (action.type){
        case 'BFX_UPDATE':
            state.bfxprice = action.payload;
            break
    }
    return state;
}