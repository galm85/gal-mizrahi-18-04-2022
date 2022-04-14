const initialState = {
    darkMode:true,
}


export const appReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'darkMode':
            return{
                ...state,
                darkMode: !state.darkMode
            }


        default: return state;

    }
}