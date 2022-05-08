import axios from 'axios';
import * as React from 'react'
import {makeStyles} from '@mui/styles';
import { useSelector } from 'react-redux';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { apiKey,autoCompleteUrl } from '../utils/config';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {debounce} from 'lodash';

const useStyles = makeStyles(theme=>({
    searchBar:{position:'relative'},
    input:{
        height:'60px',
        width:'50%',
        fontSize:'15px',
        borderTopLeftRadius:'10px',
        borderBottomLeftRadius:'10px',
        padding:'0 20px',
        outline:'none',
        border:'none',
        backgroundColor:'#ced4da',
        fontFamily:theme.fonts.mainFont,
        fontWeight:theme.fontW.bold,
        [theme.breakpoints.down('sm')]:{
            width:'80%',
        },
    },
    searchBtn:{
        border:'none',
        height:'60px',
        width:'10%',
        cursor:'pointer',
        fontSize:'16px',
        borderTopRightRadius:'10px',
        borderBottomRightRadius:'10px',
        background:'#ced4da',
        transitionDuration:'0.2s',
        fontFamily:theme.fonts.mainFont,
        [theme.breakpoints.down('sm')]:{
            width:'20%',
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
        background:'#ced4da',
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
        position:'absolute',
        left:0,
        right:0,
        zIndex:30,
        
    },
    error:{
        fontFamily:theme.fonts.mainFont,
        marginTop:'5px',
        color:'#ef233c',
        fontSize:'20px',
        fontWeight:theme.fontW.bold,
        background:'rgba(0,0,0,0.5)',
        position:'absolute',
        zIndex:50,
        left:'50%',
        borderRadius:'10px',
        transform:'translate(-50%,10px)',
        [theme.breakpoints.down('sm')]:{
            width:'100%',
        },
       
    }
}))


const SearchBar = ({selectCityHandler}) => {

    const classes = useStyles();
    const {favorites} = useSelector(state=>state.settingReducer)
    const [value,setValue] = React.useState('');
    const [error,setError] = React.useState(null);
    const [suggestions,setSuggestions] = React.useState([]);

    
    // lodash debounce
    const deb = React.useCallback(
        debounce((text)=>autoComplete(text),1000)
    ,[])


    // My custom Debounce

    // const myDeb = (fn,delay=1000)=>{
    //     let timer;
    //         return function(...args){
    //         const context = this;
    //         if(timer) clearTimeout(timer);

    //         timer = setTimeout(()=>{
    //             timer = null;
    //             fn.apply(context,args);
    //         },delay);

    // }
    // }

    // const debAutocomplate = React.useCallback(
    //     myDeb((text)=>autoComplete(text),1000)
    // ,[])
    
    const handleChange = async(e)=>{

        setError('');
        let param = e.target.value;
        let regex = new RegExp(/^[a-zA-Z\s]*$/);
        
        if((regex.test(param)) || (param === '') ){
            setValue(e.target.value);
             deb(param);
            // debAutocomplate(param);
        }else{            
            setError('Please Insert Only Letters in English')
            setSuggestions([]);
        }
        
    }

    const inFavorites = (city)=>{
        let isFavorite = false;
            if(favorites){
                favorites.forEach(fav=>{
                    if(fav.Key === city.Key){
                        isFavorite = true;
                    }
                })
            }
                
        return isFavorite;
    }


    const handleError = (value,results)=>{
        if(value !== '' && results < 1){
            setError('*No City Match');
        }else{
            setError(null);
        }
    }


    const handleSelect = (e,city=null)=>{
        e.preventDefault();
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
        handleError(value,res.data.length);
    }


    return ( 
        <div className={classes.searchBar}>
            
            {/* Input Field */}
            <form onSubmit={handleSelect} style={{display:"flex",alignItems:'center',justifyContent:'center',margin:'auto'}}>
                <input  type="text" className={classes.input} value={value} onChange={handleChange} placeholder="Search"/>
                <button className={classes.searchBtn} disabled={suggestions.length === 0} ><SearchIcon/></button>
            </form>
            {/* End Input Field */}
            
            {error && <p className={classes.error}>{error}</p>}
            
            {/* Suggestions Box */}
            {suggestions.length > 0 && 
                <div className={classes.suggestions}>
                    {suggestions.map(suggest=>(
                        <div key={suggest.Key} className={classes.suggest}  onClick={(e)=>handleSelect(e,suggest)}>
                            <p style={{flex:1}}>{suggest.LocalizedName}</p>
                            {inFavorites(suggest) && <span><FavoriteIcon fontSize='small' color='error'/></span>}
                        </div>
                    ))}
                </div>
            }
            {/* End Suggestions Box */}
            
            {suggestions.length > 0 && <div className={classes.popup} onClick={()=>setSuggestions([])}></div>}
        
        </div>
     );
}
 
export default SearchBar;