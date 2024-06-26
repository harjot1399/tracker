import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import React from "react";
import { TextField, Alert} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [passwordError, setPasswordError] = useState(false);
    const navigator = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const passwordCheck = () =>{
        return formData.password === formData.confirmPassword;

    }

    const handleSubmit = async (event)=> {
        event.preventDefault();
        const dataToSubmit = {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }

        if (passwordCheck()){
            console.log(formData);
            setPasswordError(false)
            try {
                const response = await fetch('http://127.0.0.1:8000/authentication/signup', {
                    method: 'POST',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(dataToSubmit)
                })

                if (response.ok){
                    console.log("User signed up successfully")
                    setTimeout(() => {
                        navigator('/')
                    },1000)
                }
            } catch(error){
                console.log(error)
            }
        }else{
            setPasswordError(true)
        }
        // Handle form submission, e.g., send data to a server
        console.log(formData);
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
                Sign Up
            </Typography>
            <Box component="form" sx = {{mt: 2}} onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="username"
                    name="username"
                    autoFocus
                    value={formData.username}
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="email"
                    name="email"
                    autoFocus
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                />

                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="confirmPassword"
                    label="confirm password"
                    name="confirmPassword"
                    autoFocus
                    value={formData.confirmPassword}
                    onChange={handleChange}

                />   
                {passwordError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Passwords do not match.
                    </Alert>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 , mb: 2}}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>
                        Create Account
                    </Button>
                </Box>
                <Typography variant='h6' > Back to <Link to="/"> Login </Link></Typography>


       
            </Box>
            
        </Box>
        
    )
}