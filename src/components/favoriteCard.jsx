import axios from 'axios';
import * as React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';
import { Button } from '@mui/material';
import { removeFromFavorites } from '../redux/actions/settingActions';
import {useNavigate} from 'react-router-dom';

const useStyles = makeStyles(theme=>({

    favoriteCard:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:theme.fonts.mainFont
    }
}))

const FavoriteCard = ({city}) => {

    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [correntCondition,setCurrentCondition] = React.useState(null);
    const [loader,setLoader] = React.useState(true);
    const metric = useSelector(state=>state.settingReducer.metric);

    const getCondition = async(city)=>{
        const res = await axios.get(`http://dataservice.accuweather.com/currentconditions/v1/${city.Key}?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF`);
        setCurrentCondition(res.data[0]);
        setLoader(false);
    }


    React.useEffect(()=>{
        getCondition(city);
       
    },[])

    return ( 
        <div className={classes.favoriteCard} onClick={()=>navigate('/',{state:city})}>
           <h3>{city.LocalizedName}<span>({city.Key})</span></h3>

            {loader && <h1>Loading</h1>}

           {!loader && <>
           <h2218>{correntCondition.WeatherText}</h2218>
           <img src={`./images/${correntCondition.WeatherIcon}.png`} alt="" />
           {metric ? <h4>{correntCondition.Temperature.Metric.Value} &#8451;</h4> : <h4>{correntCondition.Temperature.Imperial.Value} &#8457;</h4>}
            <Button onClick={(e)=>{e.stopPropagation();dispatch(removeFromFavorites(city))}}>Remove</Button>
           
           </>}
        </div>
     );
}
 
export default FavoriteCard;