import axios from 'axios';
import { getFiveDays } from './weatherActions';
import { toast } from "react-toastify";


export const handleDarkMode = ()=>(dispatch)=>{

    let weather;
    
    if(localStorage.getItem('weather')){
        weather = JSON.parse(localStorage.getItem('weather'));
       if(weather.darkMode !== undefined){
           weather.darkMode = !weather.darkMode;
       }else{
           weather.darkMode = true;
       }
       localStorage.setItem('weather',JSON.stringify(weather));

    }else{
        weather = {darkMode:true};
        localStorage.setItem('weather',JSON.stringify(weather));
    }

    dispatch({
        type:'handleDarkMode'
    })
}


export const handleMetric = ()=>(dispatch)=>{
    let weather;
    if(localStorage.getItem('weather')){
        weather = JSON.parse(localStorage.getItem('weather'));
       if(weather.metric !== undefined){
           weather.metric = !weather.metric;
       }else{
           weather.metric = true;
       }
       localStorage.setItem('weather',JSON.stringify(weather));

    }else{
        weather = {metric:true};
        localStorage.setItem('weather',JSON.stringify(weather));
    }
    dispatch({
        type:'handleMetric'
    })
    
}


export const AddToFavorite = (city)=>(dispatch)=>{
   
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
    toast.info(`${city.LocalizedName} add to your favorites`)
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
    toast.error(`${city.LocalizedName} Revoved from your favorites`)
}


