import axios from 'axios';



export const handleDarkMode = ()=>(dispatch)=>{
    dispatch({
        type:'darkMode'
    })
}


export const AddToFavorite = (city)=>(dispatch)=>{
    console.log(city);
    let weather;
    
    if(localStorage.getItem('weather')){
        weather = JSON.parse(localStorage.getItem('weather'));
        weather.favorites.push(city);
        localStorage.setItem('weather',JSON.stringify(weather));
    }else{
        weather = {...weather,favorites:[city]};
        localStorage.setItem('weather',JSON.stringify(weather));
    }

    dispatch({
        type:'addToFavorite',
        payload:weather.favorites,
    })
}


export const getAllFavorites = ()=>(dispatch)=>{

    let weather;
    if(localStorage.getItem('weather')){
        weather = JSON.parse(localStorage.getItem('weather'));
        dispatch({
            type:'getAllFavorites',
            payload:weather.favorites
        })
    }

}



export const removeFromFavorites = (city)=>async(dispatch)=>{
    let weather = JSON.parse(localStorage.getItem('weather'));
    weather.favorites = weather.favorites.filter(fav=> fav.Key !== city.Key);
    localStorage.setItem('weather',JSON.stringify(weather));
    dispatch({
        type:'removeFromFavorites',
        payload:weather.favorites
    })
}


