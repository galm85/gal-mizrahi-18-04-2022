import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import SearchBar from '../components/searchBar';
import {makeStyles} from '@mui/styles';
import {fiveDaysDemo,currentCityDataDemo,currentCityDemo} from '../data/data';
import {useDispatch, useSelector} from 'react-redux';
import { AddToFavorite } from '../redux/actions/settingActions';
import { getCurrentCondition,getFiveDays, setCurrentCity } from '../redux/actions/weatherActions';
import DayCard from '../components/dayCard';
import { padding } from '@mui/system';

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
        
        padding:'50px 20px'
    }, 
    dataTitle:{
        paddingLeft:'20px',
        fontFamily:theme.fonts.mainFont,
        fontSize:'2rem',
        "& $h4":{
            fontWeight:theme.fontW.light
        } 
    },
    dataActions:{
        display:'flex',
        justifyContent:'right'
   },
   main:{
       textAlign:'center',
       paddingBottom:'50px',
       
       "& $img":{
           width:'20%',
       },
       "& $h1":{
           fontFamily:theme.fonts.mainFont,
           fontSize:'3rem'
       }
   },
   forcast:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
   }
}))

const Home = () => {

    const dispatch = useDispatch();
    const classes = useStyles();

    const currentCity = useSelector(state=>state.weatherReducer.currentCity);
    const fiveDays = useSelector(state=>state.weatherReducer.fiveDays);
    const correntCondition = useSelector(state=>state.weatherReducer.currentCondition);
    const favorites = useSelector(state=>state.settingReducer.favorites);

   

    const inFavorites = (city)=>{
        let infavorite = false;
        favorites.forEach(fav=>{
            if(fav.Key === city.Key){
                infavorite = true;
            }
        })
        return infavorite;
    }


    const selectCityHandler = async(city)=>{
        
        dispatch(setCurrentCity(city));
       await dispatch(getCurrentCondition(city));
       await dispatch(getFiveDays(city));
    }


   

    return ( 
       <Container className={classes.homeContainer} >

            <Grid container className={classes.searchBar}> 
                <Grid item sm={12} >
                    <SearchBar selectCityHandler={selectCityHandler} currentCity={currentCity}/>
                </Grid>
            </Grid>


            {(currentCity && correntCondition && fiveDays) &&
            <Grid container  className={classes.dataContainer} >

                    <Grid item xs={12}>
                        <Grid container style={{padding:'0 50px'}} >
                            <Grid item xs={6} className={classes.dataTitle} >
                                    <h4>{currentCity.LocalizedName}</h4>
                                    <h4>{correntCondition.Temperature.Metric.Value}&deg;C</h4>
                            </Grid>
                            <Grid item xs={6} className={classes.dataActions}>
                                {inFavorites(currentCity) ? <p>in Favorite</p> : <Button onClick={()=>dispatch(AddToFavorite(currentCity))} variant='contained'>Add To Favorite</Button>}
                            </Grid>
                        </Grid>
                    </Grid>
                        
                    <Grid item xs={12} className={classes.main}>
                        <img src={`./images/${correntCondition.WeatherIcon}.png`} alt="" />
                        <h1>{correntCondition.WeatherText}</h1>
                    </Grid>

                    <Grid item sm={12}>
                        <Grid container className={classes.forcast}>
                            {fiveDays.map((day,index)=>(
                                <Grid item xs={6} sm={2}  key={index}>
                                    <DayCard day={day}/>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

               

                

            </Grid>
            }

       </Container>
     );
}
 
export default Home;