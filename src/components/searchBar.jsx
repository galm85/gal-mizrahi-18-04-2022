import axios from 'axios';
import * as React from 'react'
import {makeStyles} from '@mui/styles';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { apiKey,autoCompleteUrl } from '../utils/config';

const useStyles = makeStyles(theme=>({
    searchBar:{position:'relative'},
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
        fontWeight:theme.fontW.bold,
        [theme.breakpoints.down('sm')]:{
            width:'70%',
        },
    },
    searchBtn:{
        border:'none',
        height:'60px',
        width:'10%',
        cursor:'pointer',
        fontSize:'16px',
        borderTopRightRadius:'20px',
        borderBottomRightRadius:'20px',
        background:'lightblue',
        borderLeft:'1px solid white',
        transitionDuration:'0.2s',
        fontFamily:theme.fonts.mainFont,
        '&:hover':{
            background:theme.colors.purpel,
            color:'white'
        },
        [theme.breakpoints.down('sm')]:{
            width:'30%',
            },
    },
    suggestions:{
        display:'flex',
        flexDirection:'column',
        width:'60%',
        position:'absolute',
        zIndex:120,
        left:'50%',
        transform:'translateX(-50%)',
        background:'lightblue',
        margin:'auto',
        padding:'10px',
        borderBottomLeftRadius:'10px',
        borderBottomRightRadius:'10px',
        borderRadius:'10px',
        marginTop:'5px',
        boxShadow:'1px 1px 10px rgba(0,0,0,0.3)',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
            },
        
    },
    suggest:{
        textAlign:'left',
        padding:'5px',
        cursor:'pointer',
        fontFamily:theme.fonts.mainFont,
        letterSpacing:'0.5px',
        transitionDuration:'0.1s',
        display:'flex',
        "&:hover":{
            backgroundColor:theme.colors.mainColor,
            color:'white',
        },
        "&:first-child":{
            color:'white',
            background:theme.colors.mainColor,
        }
    },
    popup:{
        width:'100%',
        height:'100vh',
        position:'fixed',
        zIndex:30,
    }
}))


const SearchBar = ({selectCityHandler}) => {

    const classes = useStyles();
    const {favorites} = useSelector(state=>state.settingReducer)
    const [value,setValue] = React.useState('');
    const [error,setError] = React.useState(null);
    const [suggestions,setSuggestions] = React.useState([]);

    
    
    const handleChange = async(e)=>{
        let param = e.target.value;
        setValue(e.target.value);
        let results =  await autoComplete(param);
        handleError(param,results);
        
    }

    const inFavorites = (city)=>{
        let infavorite = false;
        favorites.forEach(fav=>{
            if(fav.Key === city.Key){
                infavorite = true;
            }
        })
        return infavorite;
    }

    const handleError = (value,results)=>{
        if(value !== '' && results < 1){
            setError('*No City Match');
        }else{
            setError(null);
        }
    }


    const handleSelect = (city=null)=>{
        if(city){
            selectCityHandler(city);
            setValue(city.LocalizedName);
        }else{
            selectCityHandler(suggestions[0]);
            setValue(suggestions[0].LocalizedName);
        }

        setSuggestions([]);
        
    }

    const autoComplete = async(value)=>{
        const res = await axios.get(`${autoCompleteUrl}?apikey=${apiKey}&q=${value}`)
        setSuggestions(res.data);
        return res.data.length;
    }


    return ( 
        <div className={classes.searchBar}>
            <input  type="text" className={classes.input} value={value} onChange={handleChange} />
            <button className={classes.searchBtn} disabled={suggestions.length === 0} onClick={()=>handleSelect()}>Search</button>
            
            {error && <p style={{color:'red'}}>{error}</p>}
            
            {suggestions.length > 0 && 
                <div className={classes.suggestions}>
                    {suggestions.map(suggest=>(
                        <div key={suggest.Key} className={classes.suggest}  onClick={()=>handleSelect(suggest)}>
                            <p style={{flex:1}}>{suggest.LocalizedName}</p>
                            {inFavorites(suggest) && <span><FavoriteIcon fontSize='small' color='error'/></span>}
                        </div>
                    ))}
                </div>


            }

            <div className={classes.popup} onClick={()=>setSuggestions([])}></div>
        </div>
     );
}
 
export default SearchBar;