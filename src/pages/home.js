import { TeachersData } from '../data/teachersData.js';
import { StudentsList } from '../data/studentsData.js'
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export default function Home() {

    const teacherCount = TeachersData.length;
    const studentCount = StudentsList.length;

    return (
        <Paper sx={{ minHeight: '88vh', backgroundColor: '#F5F5F5' }}>
            <Container sx={{ py: 8 }}>

                <Grid container justifyContent="center" columnSpacing={{ xs: 4, md: 8 }}
                    rowSpacing={{ xs: 4, md: 8 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    {/* teachers */}
                    <Grid item >
                        <Paper sx={{ height: 180, width: 250, p: 3 }}>
                            <Typography gutterBottom component="p" sx={{
                                fontSize: '30px',
                                fontWeight: 'bold', color: '#4a148c'
                            }}
                            >
                                Teachers
                            </Typography>
                            <Typography gutterBottom component="p" sx={{
                                fontSize: '15px',
                                fontWeight: 600, color: '#d81b60'
                            }}
                            >
                                Total count of Teachers
                            </Typography>
                            <Typography gutterBottom component="p" sx={{
                                pt: 2, fontSize: '50px', fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', color: '#00796b'
                            }}>
                                {teacherCount}
                            </Typography>
                        </Paper>
                    </Grid>

                    {/* students */}
                    <Grid item >
                        <Paper sx={{ height: 180, width: 250, p: 3 }}>
                            <Typography gutterBottom component="p" sx={{
                                fontSize: '30px',
                                fontWeight: 'bold', color: '#4a148c'
                            }}
                            >
                                Students
                            </Typography>
                            <Typography gutterBottom component="p" sx={{
                                fontSize: '15px',
                                fontWeight: 600, color: '#d81b60'
                            }}
                            >
                                Total count of Students
                            </Typography>
                            <Typography gutterBottom component="p" sx={{
                                pt: 2, fontSize: '50px', fontWeight: 'bold',
                                display: 'flex', justifyContent: 'center', color: '#00796b'
                            }}
                            >
                                {studentCount}
                            </Typography>
                        </Paper>
                    </Grid>

                </Grid>
            </Container>
        </Paper >
    )
}