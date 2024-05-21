import React from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { TextField, Alert } from "@mui/material";
import { useState } from "react";
import { Link , useNavigate} from 'react-router-dom';


export function LoginPage() {

    const [loginError , setLoginError] = useState(false)

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigator = useNavigate()

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLogin  = async (event)  =>{
        event.preventDefault()
        localStorage.setItem('username', formData.username)
        localStorage.setItem('password', formData.password)
        try{
            const response = await fetch('http://127.0.0.1:8000/authentication/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(formData)
            })
            if (response.ok ) {
                setTimeout(() => {
                    navigator('/home')
                },1000)
            }else{
                setLoginError(true)
            }
        }catch(error){
            console.log(error)
        }
    }

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

                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 3 }}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>

                {loginError && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        Invalid Credentials
                    </Alert>
                )}

                <Typography variant="h6" > Do not have an account yet? <Link to = "/signup"> Sign Up </Link></Typography>
                

                
            </Box>
        </Box>
    )
}