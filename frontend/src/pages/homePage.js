import React from "react";
import { Typography, Box } from "@mui/material";


function HomePage () {

    
    return (
        <Box sx= {
            {
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center'
            }
        }>
            <Typography variant="h3" >
                Job Tracker 
            </Typography>
        </Box>

    )
}

export default HomePage;