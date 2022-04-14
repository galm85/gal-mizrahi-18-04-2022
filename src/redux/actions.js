import axios from 'axios';



export const handleDarkMode = ()=>(dispatch)=>{
    dispatch({
        type:'darkMode'
    })
}