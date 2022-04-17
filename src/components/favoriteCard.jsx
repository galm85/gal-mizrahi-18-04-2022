import axios from 'axios';
import * as React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { removeFromFavorites } from '../redux/actions/settingActions';
import {useNavigate} from 'react-router-dom';
import Loader from './loader';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { setCurrentCity } from '../redux/actions/weatherActions';
import { apiKey,weather_api } from "../utils/config";
import Fade from 'react-reveal';

const useStyles = makeStyles(theme=>({

    favoriteCard:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:theme.fonts.mainFont,
        cursor:'pointer',
        margin:'20px',        
        borderRadius:'20px',
        padding:'10px',
        transitionDuration:'0.2s',
        outline:'0.1px solid rgba(0,0,0,0.2)',
        position:'relative',
        overflow:'hidden',
        '&:hover':{
            boxShadow:'1px 1px 10px rgba(0,0,0,0.2)',
            '& $div':{
                opacity:1,
            }
        }

    },
    darkMode:{
        outline:'0.1px solid rgba(255,255,255,0.9)',
        '&:hover':{
            boxShadow:'1px 1px 10px rgba(255,255,255,0.9)',
            '& $div':{
                opacity:1,
            }
        }
    },
    btn:{
        position:'absolute',
        top:0,
        right:0,
        opacity:0,
        transitionDuration:'0.2s',
        
    }
}))

const FavoriteCard = ({city,darkMode}) => {

    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [correntCondition,setCurrentCondition] = React.useState(null);
    const [loader,setLoader] = React.useState(true);
    const metric = useSelector(state=>state.settingReducer.metric);

    const getCondition = async(city)=>{
        const res = await axios.get(`${weather_api}/currentconditions/v1/${city.Key}?apikey=${apiKey}`);
        setCurrentCondition(res.data[0]);
        setLoader(false);
    }


    React.useEffect(()=>{
        getCondition(city);
    },[])


    const handleNavigate = ()=>{
        dispatch(setCurrentCity(city));
        navigate('/');
    }

    return ( 
        <Fade left>

        <div className={darkMode ? `${classes.favoriteCard} ${classes.darkMode}` : classes.favoriteCard} onClick={()=>handleNavigate()}>
           <h3>{city.LocalizedName}</h3>
           <small>({city.Key})</small>

            {loader ?  <Loader /> : 

            <>
                <h2 style={{margin:'10px 0',textAlign:'center'}}>{correntCondition.WeatherText}</h2>
                <img src={`./images/${correntCondition.WeatherIcon}.png`} alt="" />
                {metric ? <h3>{correntCondition.Temperature.Metric.Value} &#8451;</h3> : <h3>{correntCondition.Temperature.Imperial.Value} &#8457;</h3>}
                
                <div className={classes.btn} onClick={(e)=>{e.stopPropagation();dispatch(removeFromFavorites(city))}}>
                    <Button  color="error" ><RemoveCircleOutlineIcon/></Button>
                </div>
                
            </>
            }
          
        </div>
        </Fade>
     );
}
 
export default FavoriteCard;