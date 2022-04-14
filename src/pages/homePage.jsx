import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import SearchBar from '../components/searchBar';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(theme=>({
    homeContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    searchBar:{
        margin:'5vh',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
        textAlign:'center'
    },
    dataContainer:{
        display:'flex',
        flexDirection:'column',
        width:'100%'
        
    }
}))

const Home = () => {

    const classes = useStyles();
    const [currentCity,setCurrentCity] = React.useState(null);
    const [currentCityData,setCurrentCityData] = React.useState(null);
    const [fiveDays,setFiveDays] = React.useState(null);

    const getDay = (date)=>{
        const days = ['Sun','Mun','Tus','Wen','Thr','Fri','Sat'];
        let day =  new Date(date).getDay();
        return days[day];  
    }

    const getFiveDays = async (city)=>{
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&metric=true`);
        setFiveDays(res.data.DailyForecasts);
    }

    const selectCityHandler = async(city)=>{
        setCurrentCity(city);
        const url = `http://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF`;
        const res = await axios.get(url);
        setCurrentCityData(res.data[0]);

        getFiveDays(city);
        
    }

    return ( 
       <Container className={classes.homeContainer} >

            <Grid container className={classes.searchBar}> 
                <Grid item sm={12} >
                    <SearchBar selectCityHandler={selectCityHandler} currentCity={currentCity}/>
                </Grid>
            </Grid>


            {currentCity && currentCityData && fiveDays &&
            <div  className={classes.dataContainer} style={{background:'green'}}>

                <Grid container className="data-header" style={{display:'flex'}} >
                    <Grid item sm={6} className="data-image">
                        <img src="https://static.timesofisrael.com/www/uploads/2020/02/Untitled-4-6.jpg" width='100px' alt="" />
                        <div className="city-title">
                            <h4>{currentCity.LocalizedName}</h4>
                            <h4>{currentCityData.Temperature.Metric.Value}</h4>
                        </div>
                    </Grid>
                    <Grid item sm={6} className="data-favorite">
                        <Button>Add To Favorite</Button>
                    </Grid>
                </Grid>

                <Grid container className="data-content">
                    <Grid item sm={12}>
                        <h1>{currentCityData.WeatherText}</h1>
                    </Grid>

                    <Grid item sm={12}>
                        <Grid container className="forcast">
                            {fiveDays.map((day,index)=>(
                                <Grid item sm={2}  key={index}>
                                    <div className="day">
                                        <h6>{getDay(day.Date)}</h6>
                                        <p>{day.Temperature.Maximum.Value}</p>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

            </div>
            }

       </Container>
     );
}
 
export default Home;