import { Divider, Grid } from '@mui/material';
import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import FavoriteCard from '../components/favoriteCard';
import { getAllFavorites, removeFromFavorites } from '../redux/actions/settingActions';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme=>({
    header:{
        paddingTop:'20px',
        "& $h1":{
            fontFamily:theme.fonts.mainFont,
            textAlign:'center',
            color:"black",
            fontWeight:theme.fontW.light
        }
    },
    headerDark:{
        "& $h1":{     
            color:"white"
        }
    },
    darkMode:{
        color:'white'
    }
}))

const Favorite = () => {


    const classes = useStyles();
    const dispatch = useDispatch();
    const {favorites,darkMode} = useSelector(state=>state.settingReducer);
    
    React.useEffect(()=>{
        dispatch(getAllFavorites());
    },[])

    return ( 
       <div className="favorite-container">
        
            <Grid container>
                <Grid item xs={12} className={darkMode ? `${classes.header} ${classes.headerDark} ` : classes.header}>
                    <h1>My Favorites</h1>
                </Grid>
            </Grid>

            <Divider style={{margin:'30px 10%',border:darkMode ? '0.2px solid rgba(255,255,255,0.3)' :'0.2px solid rgba(0,0,0,0.15)'}}/>

                
            <Grid container style={{display:'flex',justifyContent:'center'}} className={darkMode ? `${classes.darkMode}` : '' } >
                
                    {(favorites && favorites.length>0)  ? 
                    <>
                        {favorites.map((fav,index)=>(
                    

                            <Grid item xs={10} sm={6} md={4} lg={3} xl={2} key={index}>
                                <FavoriteCard city={fav} darkMode={darkMode} />
                            </Grid>
                    
                        ))}
                    </>
                    :
                    <>
                        <h1>No Favorites yet</h1>
                    </>  
                }

            </Grid>
    
        
       </div>
     );
}
 
export default Favorite;