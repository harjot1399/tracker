import React, { useState , useEffect} from "react";
import { Typography, Box, Button, Dialog, Card, CardContent, CardActions} from "@mui/material";
import AddIcon from '@mui/icons-material/Add'; 
import { JobForm
} from "../components/jobForm";



function HomePage () {
    const [openDailog, setOpenDialog] = useState(false)
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    const credentials =  btoa(`${username}:${password}`)

    const [jobs, setJobs] = useState([])

    const [jobSaved, setJobSaved] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
      };
    
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    
    const jobDelete =  async (id) => {
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/${username}/jobs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            })

            if (response.ok){
                fetchJobs()

            }
        }catch(error){
            console.log(error)
        }


    }
    

    const fetchJobs = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/${username}/jobs`, {
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            if (response.ok) {
                const jobsData = await response.json();
                setJobs(jobsData);
            } else {
                console.error('Failed to fetch jobs');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
        }
    };

    useEffect(() => {
        

        fetchJobs();
    }, [username, credentials, jobSaved]);

    
    return (
        <Box sx={{ 
            position: 'relative',
            height: '100vh', // Full viewport height
        }}>

            <Box sx={{ // Parent Box for layout
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            paddingTop: '100px', // Adjust as needed
                        }}>

                {/* Top center Job Tracker text */}
                <Typography variant="h3" sx={{ 
                    textAlign: 'center',
                    position: 'absolute',
                    top: 16, // Adjust from the top
                    left: '50%',  // Position in the middle
                    transform: 'translateX(-50%)', // Adjust for text width
                }}>
                    Job Tracker
                </Typography>

                
                {jobs.map((job) => (
                    <Card key={job.id} sx={{ width: '300px', margin: '8px' }}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {job.title}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {job.company}
                            </Typography>
                            <Typography variant="body2">
                                {job.status}
                            </Typography>
                            <Typography variant="body2">
                                {job.date_applied}
                            </Typography>
                        </CardContent>

                        <CardActions className="card-icons"> 
                            <Button size="small" color="primary" >Edit</Button>
                            <Button size="small" color="error" onClick={()=> jobDelete(job.id)}>Delete</Button>
                        </CardActions>
                    </Card>
                ))}
                


            </Box>
            {/* Top right Add icon button */}
            <Button 
                onClick={handleOpenDialog}
                variant="outlined" 
                startIcon={<AddIcon />} 
                color="primary" 
                sx={{ 
                    position: 'absolute', 
                    top: 16,
                    right: 16 ,
                }}
            >
            </Button> 

            

            <Dialog open={openDailog} onClose={handleCloseDialog}>
                <JobForm onClose={handleCloseDialog} onJobSaved = {setJobSaved}/>
            </Dialog>
        </Box>
    );
}

export default HomePage;