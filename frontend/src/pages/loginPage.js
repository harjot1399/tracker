import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField } from "@mui/material";
import { useState } from "react";


export function LoginPage() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }
            }
        >
            <Typography variant='h3' sx = {{mb: 20, mt: 2}}> Job Tracker</Typography>
            
            <Typography variant='h5'>
                Log In
            </Typography>
            <Box component="form" sx = {{mt: 2}} >
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoFocus
                    value = {formData.username}
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoFocus
                    value= {formData.password}
                    onChange={handleChange}
                  
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Login
                    </Button>
                </Box>

                
            </Box>
        </Box>
    )
}