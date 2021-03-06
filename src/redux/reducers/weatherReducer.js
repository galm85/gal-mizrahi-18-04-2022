
const initialState = {
    currentCity:null,
    fiveDays:null,
    currentCondition:null,
    usingLocation:false,
    suggestions:null,
}


export const weatherReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'getCityByLocation':
            return{
                ...state,
                currentCity:action.payload,
                usingLocation:true
            }

        case 'setCurrentCity':
             return {
                ...state,
                currentCity:action.payload,
                usingLocation:false
            }

        case 'getFiveDays':
            return{
                ...state,
                fiveDays:action.payload,

            }

        case 'getCurrentCondition':
            return{
                ...state,
                currentCondition:action.payload
            }

        case 'autoComplate':
            return{
                ...state,
                suggestions:action.payload
            }



        default: return state;

    }
}