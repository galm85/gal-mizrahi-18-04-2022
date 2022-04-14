import { Button } from '@mui/material';
import * as React from 'react';

const Favorite = () => {


    const [city,setCity] = React.useState('tel-aviv');
    const [search,setSearch] = React.useState(null);
    

    return ( 
       <div className="home-container">

            <div className="search-bar">
                <input type="text" name="search" value={search}  />
                <Button>Search</Button>
            </div>

       </div>
     );
}
 
export default Favorite;