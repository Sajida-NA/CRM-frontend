import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


export default function Navbar() {
  return (
    <div>
      {/* <Box sx={{display: 'flex',width:400,height:40}}> */}

         <AppBar position="static"
         elevation={0}
         sx={{ 
      
        boxShadow: "none",
        width:400,
        height:50,
        display:'flex',
        flexDirection:'column',
        // alignContent:'center',
      bgcolor:"#fafafa"
      
       
        
        
        }}>
        <Toolbar >

         <Typography
           
            component="div"
            // sx={{ flexGrow: 1, display: 'flex',color:"#212121"}}
             sx={{
            flexGrow: 1,
            color: "#212121",
            fontWeight: 600,
            fontSize: "18px",
            width:200,
             alignItems:'flex-start',
            
             
              mr:12
            
          }}
          >
         Create Ticket
          </Typography>

  <Box sx={{ display:'flex',alignItems:'flex-end',  flexDirection:'column',width:200,height:30, alignContent:'center'}}>


          <IconButton 
          size='small' >
  <CloseIcon  />
</IconButton>
</Box>

</Toolbar>
</AppBar>

      {/* </Box> */}
    </div>
  )
}
