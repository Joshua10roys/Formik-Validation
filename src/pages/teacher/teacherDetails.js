import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TeachersData } from '../../data/teachersData';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


// function component
export default function TeacherDetails() {

    const navigate = useNavigate();

    // getting teacher id from params
    const { id } = useParams();

    // getting teacher object
    const teacher = TeachersData.find((teacher) => { if (teacher.id === id) { return teacher } });

    // function delete
    const deleteTeacher = (id) => {

        let text = "Press 'OK' to delete";

        // confirm delete ? 
        if (window.confirm(text) === true) {
            let index = TeachersData.map(e => e.id).indexOf(id);
            TeachersData.splice(index, 1);
            navigate('/home/teachers');
        }
    }

    return (
        <Paper sx={{ minHeight: '90vh', backgroundColor: '#F5F5F5', p: 2 }}>

            {/* buttons */}
            <Container>
                <Stack direction="row" spacing={2} sx={{ my: 3 }}>

                    {/* button edit */}
                    <Button
                        variant="contained"
                        sx={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
                        onClick={() => { navigate(`/home/teachers/edit/${id}`) }}
                    >Edit</Button>

                    {/* button delete */}
                    <Button
                        variant="contained" color="error"
                        sx={{ textTransform: 'none', fontSize: 16, fontWeight: 'bold' }}
                        onClick={() => deleteTeacher(id)}
                    >Delete</Button>
                </Stack>
            </Container>

            <Container component={Paper} sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* title & description */}
                <Typography variant='h5' sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Teacher Details
                </Typography>

                {/* form */}
                <Grid container paddingY={3} paddingX={5} rowSpacing={4} columnSpacing={6}>

                    {/* name */}
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth value={teacher.name} label="Name"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* age */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={teacher.age} label="Age"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* gender */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={teacher.gender} label="Gender"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* phone */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={teacher.phone} label="Phone No."
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* email */}
                    <Grid item xs={12} sm={5}>
                        <TextField fullWidth value={teacher.email} label="Email Id"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* department */}
                    <Grid item xs={12} sm={3}>
                        <TextField fullWidth value={teacher.department} label="Department"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* field */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={teacher.field} label="Field"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* experience */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={teacher.yearsOfExperience} label="Experience"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                    {/* teachers rating */}
                    <Grid item xs={12} sm={4}>
                        <TextField fullWidth value={teacher.studentsRating} label="Students Rating"
                            variant="standard" InputLabelProps={{ shrink: true }} />
                    </Grid>

                </Grid>
            </Container>
        </Paper>
    );
}