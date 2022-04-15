const initialState = {
    darkMode:false,
    metric:true,
    favorites: localStorage.getItem('weather') ? JSON.parse(localStorage.getItem('weather')).favorites : [],
}


export const settingReducer = (state=initialState,action)=>{
    switch(action.type){

        case 'darkMode':
            return{
                ...state,
                darkMode: !state.darkMode
            }

        case 'addToFavorite':
            // let newList = [...state.favorites];
            // newList.push(action.payload);
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