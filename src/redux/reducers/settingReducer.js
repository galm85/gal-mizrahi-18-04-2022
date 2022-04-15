const initialState = {
    darkMode: localStorage.getItem('weather') ? JSON.parse(localStorage.getItem('weather')).darkMode : false,
    metric:localStorage.getItem('weather') ? JSON.parse(localStorage.getItem('weather')).metric : true,
    favorites: localStorage.getItem('weather') ? JSON.parse(localStorage.getItem('weather')).favorites : [],
}


export const settingReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'handleDarkMode':
            return{
                ...state,
                darkMode: !state.darkMode
            }

        case 'handleMetric':
            return{
                ...state,
                metric: !state.metric
            }

        case 'addToFavorite':
            
            return{
                ...state,
                favorites:action.payload,
            }

        case 'getAllFavorites':
            return {
                ...state,
                favorites:action.payload
            }

        case 'removeFromFavorites':
            return{
                ...state,
                favorites:action.payload
            }


        default: return state;

    }
}