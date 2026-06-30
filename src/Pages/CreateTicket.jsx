import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Navbar from "../Components/Tickets/Navbar";




export default function CreateTicket() {

  const [status, setStatus] = useState("");

  const [source, setSource] = useState("");

  const [priority, setPriority] = useState("");
  
  const [owner, setOwner] = useState("");




  const handleChange = (event) => {
    setStatus(event.target.value);
  };
  
  return (
    <>
   
   
    <Box
    
     
      component="form"
      sx={{
        width: 400,
        p: 1,
        border: 1,
        borderColor: "grey",
        borderRadius: 1,
        display: "flex",
        flexDirection: "column",
        gap: 1,
      alignItems:"flex-start",
     
      }}
    >
<Navbar></Navbar>
    

<Box sx={{width:"100%",display:"flex",  flexDirection: "column",  alignItems:"flex-start"}}>


 <Typography>
        Ticket Name <span style={{ color: "red" }}>*</span>
      </Typography>

      <TextField 
       
        required
        fullWidth
        variant="outlined"
        placeholder="Enter"
        size="small"
        
        
        
      />
</Box>

<Box sx={{width:"100%",display:"flex",  flexDirection: "column",  alignItems:"flex-start",marginTop:2}}>


<Typography> Description</Typography>

 <TextField
          id="outlined-multiline-static"
          fullWidth
          multiline
          rows={4}
          placeholder="Enter"
        />

</Box>


<Box  sx={{  width: "100%"}}>


<Box sx={{display:"flex", marginTop:2}}>


 <Box sx={{ display: "flex", flexDirection: "column", flex: 1 ,alignItems:"flex-start",width:"80px"}}>


<Typography>Ticket Status  <span style={{ color: "red" }}>*</span></Typography>

 <FormControl sx={{width:150}}>
        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
          size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
</Box>

<Box sx={{display:"flex",flexDirection:"column",flex: 1,alignItems:"flex-start",width:"80px"}}>




      <Typography>Source  <span style={{ color: "red" }}>*</span></Typography>

 <FormControl sx={{width:150}}>
        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="Source"
          onChange={(e) => setSource(e.target.value)}
           size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
</Box> 
</Box>
     
     </Box>
      
  
  <Box sx={{width:"100%",display:"flex",  flexDirection: "column",  alignItems:"flex-start",marginTop:2}}>

   <Typography>Priority <span style={{ color: "red" }}>*</span></Typography>

 <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="Source"
          onChange={(e) => setPriority(e.target.value)}
           size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
</Box>


<Box sx={{width:"100%",display:"flex",  flexDirection: "column",  alignItems:"flex-start",marginTop:2}}>

       <Typography>Ticket Owner <span style={{ color: "red" }}>*</span></Typography>

 <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Choose</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={source}
          label="Source"
          onChange={(e) => setOwner(e.target.value)}
           size="small"
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>

</Box>

<Box sx={{marginTop:10,display:"flex",alignItems:"center" ,marginLeft:6}}>
 <Stack spacing={2} direction="row" >
  
<Button variant="outlined"  sx={{width:150,color:"black",borderColor:"gray"}} >Cancel</Button>
<Button variant="contained" sx={{width:150,backgroundColor:"#6f42c1"}}>Save</Button>
    </Stack>

</Box>

    </Box>
    </>
  );
}