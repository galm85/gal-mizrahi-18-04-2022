const initialState = {
    currentCity:null,
    fiveDays:null,
    currentCondition:null,
    loader:false,
    suggestions:null,
}


export const weatherReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'setCurrentCity':
             return {
                ...state,
                currentCity:action.payload
            }

        case 'getFiveDays':
            return{
                ...state,
                fiveDays:action.payload
            }

        case 'getCurrentCondition':
            return{
                ...state,
                currentCondition:action.payload
            }

        case 'aautoComplate':
            return{
                ...state,
                suggestions:action.payload
            }



        default: return state;

    }
}