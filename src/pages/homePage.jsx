import { Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import SearchBar from '../components/searchBar';
import {makeStyles} from '@mui/styles';
import {useDispatch, useSelector} from 'react-redux';
import { AddToFavorite, removeFromFavorites } from '../redux/actions/settingActions';
import { getCurrentCondition,getFiveDays, setCurrentCity,getCityByLocation} from '../redux/actions/weatherActions';
import DayCard from '../components/dayCard';
import { useLocation } from 'react-router-dom';
import DetailsModal from '../components/detailsModal';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const useStyles = makeStyles(theme=>({
    homeContainer:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'95vh'
    },
    searchBar:{
        padding:'5vh',
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
    const location = useLocation();
    const {currentCity,fiveDays,currentCondition,usingLocation} = useSelector(state=>state.weatherReducer);
    const {favorites,metric} = useSelector(state=>state.settingReducer);
   

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
        dispatch(getCurrentCondition(city));
        dispatch(getFiveDays(city,metric));
    }


    


    React.useEffect(()=>{
        
        if(location.state){
            let city = location.state;
            selectCityHandler(city);
            location.state = null;
        }else{
            if(currentCity){
                dispatch(getFiveDays(currentCity,metric));
            }else{
                navigator.geolocation.getCurrentPosition((position)=>{
                    dispatch(getCityByLocation(position.coords.latitude,position.coords.longitude));
                })
            }
        }
            
    },[metric,currentCity])


   

    return ( 
       <Container className={classes.homeContainer} >

            <Grid container className={classes.searchBar}> 
                <Grid item sm={12} style={{position:'relative',zIndex:20}}>
                    <SearchBar selectCityHandler={selectCityHandler} currentCity={currentCity}/>
                </Grid>
            </Grid>


            {(currentCity && currentCondition && fiveDays) &&
            <Grid container  className={classes.dataContainer} >

                    <Grid item xs={12}>
                        <Grid container style={{padding:'0 50px'}} >
                            <Grid item xs={6} className={classes.dataTitle} >
                                    <h4>{currentCity.LocalizedName} {usingLocation && <LocationOnIcon />}</h4>
                                    {metric ? 
                                        <h4>{currentCondition.Temperature.Metric.Value}&deg;{currentCondition.Temperature.Metric.Unit}</h4> 
                                        : 
                                        <h4>{currentCondition.Temperature.Imperial.Value}&deg;{currentCondition.Temperature.Imperial.Unit}</h4>
                                    } 
                            </Grid>
                            <Grid item xs={6} className={classes.dataActions}>
                                {inFavorites(currentCity) ? 
                                <Button onClick={()=>dispatch(removeFromFavorites(currentCity))} color='error' variant='contained'>Remove To Favorite</Button>
                                : 
                                <Button onClick={()=>dispatch(AddToFavorite(currentCity))} variant='contained'>Add To Favorite</Button>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                        
                    <Grid item xs={12} className={classes.main}>
                        <img src={`./images/${currentCondition.WeatherIcon}.png`} alt="" />
                        <h1>{currentCondition.WeatherText}</h1>
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