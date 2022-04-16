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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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
    dataHeader:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
    },
    dataTitle:{
        paddingLeft:'20px',
        fontFamily:theme.fonts.mainFont,
        fontSize:'2rem',
        "& $h4":{
            fontWeight:theme.fontW.light
        },
        [theme.breakpoints.down('sm')]:{
            fontSize:'1.5rem',
            marginBottom:'20px'
         },
    },
    dataActions:{
        display:'flex',
        justifyContent:'right',
   },
   main:{
       textAlign:'center',
       paddingBottom:'50px',
       "& $img":{
           width:'20%',
           marginTop:'30px',
           [theme.breakpoints.down('sm')]:{
            width:'90%',
            },
       },
       "& $h1":{
           fontFamily:theme.fonts.mainFont,
           fontSize:'3rem'
       }
   },
   forcast:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      
   },

   darkMode:{
       color:'white'
   }


}))

const Home = () => {

    const dispatch = useDispatch();
    const {favorites,metric,darkMode} = useSelector(state=>state.settingReducer);
    const {currentCity,fiveDays,currentCondition,usingLocation} = useSelector(state=>state.weatherReducer);
    const classes = useStyles(darkMode);
   

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
        if(!currentCity){
            navigator.geolocation.getCurrentPosition((position)=>{
                dispatch(getCityByLocation(position.coords.latitude,position.coords.longitude));
           })     
        }else{
            dispatch(getCurrentCondition(currentCity));
            dispatch(getFiveDays(currentCity,metric));
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
            <Grid container  className={darkMode ? `${classes.dataContainer} ${classes.darkMode}` : classes.dataContainer } >

                    <Grid item xs={12}>
                        <Grid container className={classes.dataHeader}>
                            
                            <Grid item xs={10} className={classes.dataTitle} >
                                    <h4>{currentCity.LocalizedName} {usingLocation && <LocationOnIcon />}</h4>
                                    {metric ? 
                                        <h4>{currentCondition.Temperature.Metric.Value}&deg;{currentCondition.Temperature.Metric.Unit}</h4> 
                                        : 
                                        <h4>{currentCondition.Temperature.Imperial.Value}&deg;{currentCondition.Temperature.Imperial.Unit}</h4>
                                    } 
                            </Grid>
                            <Grid item xs={2} className={classes.dataActions}>
                                {inFavorites(currentCity) ? 
                                <FavoriteIcon onClick={()=>dispatch(removeFromFavorites(currentCity))} style={{position:'relative',zIndex:50}} color='primary' fontSize='large'/>
                                : 
                                <FavoriteBorderIcon onClick={()=>dispatch(AddToFavorite(currentCity))} style={{position:'relative',zIndex:50}} color='primary' fontSize='large'/>
                                }
                            </Grid>

                        </Grid>
                    </Grid>

                        
                    <Grid item xs={12} className={classes.main}>
                        <img src={`./images/${currentCondition.WeatherIcon}.png`} alt="" />
                        <h1>{currentCondition.WeatherText}</h1>
                    </Grid>
                
                    

                    <Grid item sm={12}>
                        <Grid container  className={classes.forcast}>
                            {fiveDays.map((day,index)=>(
                                <Grid item xs={8} sm={2}  key={index}>
                                    <DayCard day={day} darkMode={darkMode}/>
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