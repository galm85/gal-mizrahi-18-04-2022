import { createTheme } from "@mui/material/styles";


const mainFont = "'Raleway', sans-serif";



export const theme = createTheme({
    fonts:{
        mainFont:mainFont
    },
    colors:{
        mainColor:'#003566',
        gray:'#CFD6EA',
        purpel:'#480ca8'
    },
    fontW:{
       light:300,
       normal:400,
       bold:700 
    }

})