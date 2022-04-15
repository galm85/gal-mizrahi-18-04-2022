import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import SearchBar from '../components/searchBar';
import {makeStyles} from '@mui/styles';
import {fiveDaysDemo,currentCityDataDemo,currentCityDemo} from '../data/data';
import {useDispatch, useSelector} from 'react-redux';
import { AddToFavorite } from '../redux/actions/settingActions';
import { getCurrentCondition,getFiveDays, setCurrentCity } from '../redux/actions/weatherActions';

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
        width:'100%',
        background:'red'
    },
    dataHeader:{
        marginBottom:'100px'
    },
    dataTitle:{
        display:'flex',
        alignItems:'center'
    },
    dataActions:{
        display:'flex',
        justifyContent:'right'
   },
   dataContent:{
       display:'flex',
       flexDirection:'column',
       alignItems:'center',
       justifyContent:'center',
       width:'100%',

       '& $h1':{
           textAlign:'center',
           marginBottom:'50px',
           fontFamily:theme.fonts.mainFont,
           fontWeight:theme.fontW.bold,
           fontSize:'3rem'
       },
       '& .forcast':{
        background:'green',
        width:'100%',
        display:'flex',
        justifyContent:'space-around',
        
        "& .day":{
            width:'100%',
            background:'blue',
            fontSize:'3rem',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            background:'yellow'

                }
       }

   }
}))

const Home = () => {

    const dispatch = useDispatch();
    const classes = useStyles();
    // const [currentCity,setCurrentCity] = React.useState(currentCityDemo);
    // const [currentCityData,setCurrentCityData] = React.useState(currentCityDataDemo);
    // const [fiveDays,setFiveDays] = React.useState(fiveDaysDemo);

    const currentCity = useSelector(state=>state.weatherReducer.currentCity);
    const fiveDays = useSelector(state=>state.weatherReducer.fiveDays);
    const correntCondition = useSelector(state=>state.weatherReducer.currentCondition);
   

    const getDay = (date)=>{
        const days = ['Sun','Mun','Tus','Wen','Thr','Fri','Sat'];
        let day =  new Date(date).getDay();
        return days[day];  
    }

    // const getFiveDays = async (city)=>{
    //     const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&metric=true`);
    //     setFiveDays(res.data.DailyForecasts);
    // }

    const selectCityHandler = async(city)=>{
        
        dispatch(setCurrentCity(city));
       await dispatch(getCurrentCondition(city));
       await dispatch(getFiveDays(city));
        // const url = `http://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF`;
        // const res = await axios.get(url);
        // setCurrentCityData(res.data[0]);

        // getFiveDays(city);
        
    }


   

    return ( 
       <Container className={classes.homeContainer} >

            <Grid container className={classes.searchBar}> 
                <Grid item sm={12} >
                    <SearchBar selectCityHandler={selectCityHandler} currentCity={currentCity}/>
                </Grid>
            </Grid>


            {(currentCity && correntCondition && fiveDays) &&
            <div  className={classes.dataContainer} >

                <Grid container className={classes.dataHeader} style={{display:'flex'}} >
                    <Grid item sm={6} className={classes.dataTitle} >
                        <img src="https://static.timesofisrael.com/www/uploads/2020/02/Untitled-4-6.jpg" width='100px' alt="" />
                        <div className="city-title">
                            <h4>{currentCity.LocalizedName}</h4>
                            <h4>{correntCondition.Temperature.Metric.Value}</h4>
                        </div>
                    </Grid>
                    <Grid item sm={6} className={classes.dataActions}>
                        <Button onClick={()=>dispatch(AddToFavorite(currentCity))} variant='contained'>Add To Favorite</Button>
                    </Grid>
                </Grid>

                <Grid container className={classes.dataContent}>
                    
                    <Grid item sm={12}>
                        <h1>{currentCity.WeatherText}</h1>
                    </Grid>

                    <Grid item sm={12}>
                        <Grid container className="forcast">
                            {fiveDays.map((day,index)=>(
                                <Grid item xs={8} sm={2}  key={index}>
                                    <div className="day">
                                        <h6>{getDay(day.Date)}</h6>
                                        <p>{day.Temperature.Maximum.Value} &#8451;</p>
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