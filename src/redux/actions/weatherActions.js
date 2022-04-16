import axios from 'axios';
import { apiKey,weather_api} from "../../utils/config";


export const setCurrentCity = (city)=>async(dispatch)=>{
    dispatch({
        type:'setCurrentCity',
        payload:city
    })
}


export const getCityByLocation = (lat,long) => async(dispatch)=>{
    const res = await axios.get(`${weather_api}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${lat},${long}`);
    dispatch({
        type:'getCityByLocation',
        payload:res.data
    })
}

export const getFiveDays = (city,metric) => async(dispatch)=>{
    const res = await axios.get(`${weather_api}/forecasts/v1/daily/5day/${city.Key}?apikey=${apiKey}&metric=${metric}`);
    dispatch({
        type:'getFiveDays',
        payload:res.data.DailyForecasts
    })
    
    
}


export const getCurrentCondition = (city)=>async(dispatch)=>{
        
        const res = await axios.get(`${weather_api}/currentconditions/v1/${city.Key}?apikey=${apiKey}`);
        dispatch({
            type:'getCurrentCondition',
            payload:res.data[0]
        })
       
}








