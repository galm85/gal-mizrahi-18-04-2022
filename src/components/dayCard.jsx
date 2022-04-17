import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme=>({
    dayCard:{
        fontFamily:theme.fonts.mainFont,
        display:'flex',
        flexDirection:'column',
        width:'100%',
        alignItems:'center',
       
        '& $h5':{
            fontSize:'1.2rem',
            fontWeight:theme.fontW.bold,
            margin:'10px',
            color:darkMode=>darkMode? 'white' :theme.colors.mainColor,
        },
        '& $h4':{
            fontSize:'1rem',
            fontWeight:theme.fontW.normal,
            margin:'5px',
        },
        '& $div':{
            textAlign:'center'
        },
        [theme.breakpoints.down('sm')]:{
            flexDirection:'row',
            margin:'10px 0',
          },
    }
}))


const DayCard = ({day,darkMode}) => {


    const {metric} = useSelector(state=>state.settingReducer);
    const classes = useStyles(darkMode);
    

    const getDay = (date)=>{
        const days = ['Sun','Mun','Tus','Wen','Thr','Fri','Sat'];
        let day =  new Date(date).getDay();
        return days[day];  
    }


    return ( 
        <div className={classes.dayCard}>
            <div>
                <h5>{getDay(day.Date)}</h5>
                <img src={`./images/${day.Day.Icon}.png`} alt={day.Day.IconPhrase} />
            </div>
            <div>
                <h4>Min: {day.Temperature.Minimum.Value}&deg; {day.Temperature.Minimum.Unit} </h4>
                <h4>Max: {day.Temperature.Maximum.Value}&deg; {day.Temperature.Maximum.Unit} </h4>
            </div>

        </div>
     );
}
 
export default DayCard;