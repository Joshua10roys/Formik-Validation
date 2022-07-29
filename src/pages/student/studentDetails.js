import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StudentsList } from "../../data/studentsData";
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


// function component
export default function StudentsDetails() {

    const navigate = useNavigate();

    // getting student id from params
    const { id } = useParams();

    // getting student object
    const student = StudentsList.find((student) => { if (student.id === id) { return student } });

    // function delete
    const deleteStudent = (id) => {
        let text = "Press 'OK' to delete";
        // confirm delete ? 
        if (window.confirm(text) === true) {
            let index = StudentsList.map(e => e.id).indexOf(id);
            StudentsList.splice(index, 1);
            navigate('/home/students');
        }
    }

    return (
        <Paper sx={{ minHeight: '90vh', backgroundColor: '#F5F5F5', pt: 1, pb: 3, px: 3 }}>

            {/* buttons */}
            <Container>
                <Stack direction="row" spacing={2} sx={{ my: 2 }}>

                    {/* button edit */}
                    <Button
                        variant="contained"
                        sx={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
                        onClick={() => { navigate(`/home/students/edit/${id}`) }}
                    >Edit</Button>

                    {/* button delete */}
                    <Button
                        variant="contained" color="error"
                        sx={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
                        onClick={() => deleteStudent(id)}
                    >Delete</Button>
                </Stack>
            </Container>

            <Container component={Paper} sx={{ pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* title & description */}
                <Typography variant='h5' sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Student Details
                </Typography>

                {/* form */}
                <Grid container paddingY={5} paddingX={5} rowSpacing={4} columnSpacing={6}>

                    {/* name */}
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={student.name} label="Name"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* age */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={student.age} label="Age"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* gender */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={student.gender} label="Gender"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* phone */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={student.phone} label="Phone No."
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* email */}
                    <Grid item xs={12} sm={5}>
                        <TextField fullWidth value={student.email} label="Email Id"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* mark */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={student.mark} label="Mark"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* employment status */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={student.status} label="Employment Status"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* work experience */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={student.workExperience} label="Work Experience"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* join date */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={student.joinDate} label="Date Joined"
                            variant="outlined" InputLabelProps={{ shrink: true }} />
                    </Grid>

                </Grid>
            </Container>
        </Paper>
    );
}