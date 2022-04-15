import axios from 'axios';
import * as React from 'react'
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme=>({
    input:{
        height:'60px',
        width:'50%',
        fontSize:'15px',
        borderTopLeftRadius:'20px',
        borderBottomLeftRadius:'20px',
        padding:'0 20px',
        outline:'none',
        border:'none',
        backgroundColor:'lightblue',
        fontFamily:theme.fonts.mainFont,
        fontWeight:theme.fontW.bold


    },
    btn:{
        border:'none',
        height:'60px',
        width:'10%',
        cursor:'pointer',
        fontSize:'16px',
        borderTopRightRadius:'20px',
        borderBottomRightRadius:'20px',
    },
    suggestions:{
        display:'flex',
        flexDirection:'column',
        width:'55%',
        background:theme.colors.gray,
        margin:'auto',
        padding:'10px',
        borderBottomLeftRadius:'10px',
        borderBottomRightRadius:'10px'
        
    },
    suggest:{
        textAlign:'left',
        padding:'5px',
        position:'relative',
        zIndex:2,
        cursor:'pointer',
        fontFamily:theme.fonts.mainFont,
        letterSpacing:'0.5px',
        transitionDuration:'0.1s',
        "&:hover":{
            backgroundColor:theme.colors.mainColor,
            color:'white',
        
        }
    }
}))


const SearchBar = ({selectCityHandler,currentCity}) => {

    const classes = useStyles();
    const [value,setValue] = React.useState('');
    const [suggestions,setSuggestions] = React.useState([]);
    
    const handleChange = async(e)=>{
        let param = e.target.value;
        setValue(e.target.value);
        autoComplete(param);
    }


    const autoComplete = async(value)=>{
        const res = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=mksSHBCIp7xcjFWSgCFksTh6rM3HjwuF&q=${value}`)
        setSuggestions(res.data);
    }


    return ( 
        <div className="search-bar">
            <input type="text" className={classes.input} value={value} onChange={handleChange} />
            <button className={classes.btn}>Search</button>
            {suggestions.length > 0 && 
                <div className={classes.suggestions}>
                    {suggestions.map(suggest=>(
                        <div key={suggest.Key} className={classes.suggest} onClick={()=>{setSuggestions([]); selectCityHandler({...suggest})}}>
                            <p>{suggest.LocalizedName}</p>
                        </div>
                    ))}
                </div>


            }
        </div>
     );
}
 
export default SearchBar;