import React from "react";
import { useState } from "react";
import { TextField, Button, DialogTitle, DialogContent, DialogActions, DesktopDatePicker , MenuItem, 
    Select,
    FormControl, 
    InputLabel,  } from "@mui/material";

import {useNavigate} from "react-router-dom"

export function JobForm({onClose, onJobSaved}) {
    const [jobData, setJobData] =useState({
        title: "",
        date_applied: "",
        company: "",
        status: ""
    })
    const navigator = useNavigate()

    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const credentials =  btoa(`${username}:${password}`)
    const handleChange = (event) => {
        const { name, value } = event.target;

        // Check if the change is from the date picker
        if (name === 'date_applied' && event.target.value) {
            const date = new Date(event.target.value); 
            // Set date_applied in the format YYYY-MM-DD
            setJobData(prevData => ({ ...prevData, [name]: date.toISOString().slice(0, 10) }));
        } else {
            // Handle other inputs (text fields and dropdown)
            setJobData(prevData => ({ ...prevData, [name]: value }));
        }
    };

    const handleSave = async ()  => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${username}/jobs`,{
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(jobData)

            })

            if (response.ok){
                onJobSaved(true)
                onClose()
            }
        } catch(error){
            console.log(error)
        }
    }

    return (
        <>
            <DialogTitle> Add a new Job</DialogTitle>
            <DialogContent>
                <TextField label="Job Title" name="title" value={jobData.title} onChange={handleChange} fullWidth margin="normal" />
                <TextField label="Company" name="company" value={jobData.company} onChange={handleChange} fullWidth margin="normal" />
                <TextField
                    label="Date Applied"
                    name="date_applied"
                    type="date"
                    value={jobData.date_applied}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true, // Ensure the label is always visible
                    }}
                />
                
                <FormControl fullWidth margin="normal">
                    <InputLabel id="status-label">Status</InputLabel>
                    <Select
                        labelId="status-label"
                        id="status"
                        name="status" 
                        value={jobData.status}
                        label="Status"
                        onChange={handleChange}
                    >
                        <MenuItem value="Applied">Applied</MenuItem>
                        <MenuItem value="Interviewing">Interviewing</MenuItem>
                        <MenuItem value="Offer">Offer</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        {/* Add more status options as needed */}
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleSave}>
                        Save
                    </Button>
                </DialogActions>


            </DialogContent>
        </>

    )
    
}