import axios from 'axios';
// import {weather_api,apiKey} from '../../utils';


export const setCurrentCity = (city)=>async(dispatch)=>{
    dispatch({
        type:'setCurrentCity',
        payload:city
    })
}


export const getCityByLocation = (lat,long) => async(dispatch)=>{
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&q=${lat},${long}`);
    dispatch({
        type:'getCityByLocation',
        payload:res.data
    })
}

export const getFiveDays = (city,metric) => async(dispatch)=>{
    const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&metric=${metric}`);
    dispatch({
        type:'getFiveDays',
        payload:res.data.DailyForecasts
    })
    
    
}


export const getCurrentCondition = (city)=>async(dispatch)=>{
        
        const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF`);
        dispatch({
            type:'getCurrentCondition',
            payload:res.data[0]
        })
       
}



export const autoComplete = (value)=>async(dispatch)=>{
    const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&q=${value}`)
    dispatch({
        type:'autoComplate',
        payload:res.data,
    })
   
}






