import { Button, Grid } from '@mui/material';
import * as React from 'react';
import { useDispatch,useSelector } from 'react-redux';
import FavoriteCard from '../components/favoriteCard';
import { getAllFavorites, removeFromFavorites } from '../redux/actions/settingActions';


const Favorite = () => {


    const dispatch = useDispatch();
    const favorites = useSelector(state=>state.settingReducer.favorites);
    

    


    React.useEffect(()=>{
        
        dispatch(getAllFavorites());

    },[])

    return ( 
       <div className="favorite-container">
           <Grid container>
      
        {(favorites && favorites.length>0)  ? 
        <>
            {favorites.map((fav,index)=>(
                <Grid item sm={5} md={2} key={index}>
                    <FavoriteCard city={fav} />
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