import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { StudentsList } from "../../data/studentsData";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';

// header titles
const head = ['Name', 'Contact', 'Gender', 'Date Joined', 'Overall Mark', 'Work Status'];

// function component
export default function Students() {

    const navigate = useNavigate();

    const [studentsList, setStudentsList] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // making the date in Alphabetical order
    useEffect(() => {
        let StudentsListSorted = StudentsList.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        // setting date
        setStudentsList(StudentsListSorted);
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ minHeight: '90vh', backgroundColor: '#F5F5F5' }}>

            {/* button for adding student */}
            <Container sx={{ pt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    sx={{ textTransform: 'none', fontSize: 16 }}
                    onClick={() => { navigate('/home/students/create') }}
                >Add New Student</Button>
            </Container>

            {/* tavle */}
            <Container sx={{ paddingY: 4 }}>
                <TableContainer component={Paper}>
                    <Table stickyHeader aria-label="simple table">

                        {/* header */}
                        <TableHead>
                            <TableRow>
                                {head.map((ele, index) => (
                                    <TableCell
                                        key={index + 1}
                                        sx={{ fontWeight: 'bold', bgcolor: '#009688', color: 'white' }}
                                        align="center"
                                    >
                                        {ele}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {/* body */}
                        <TableBody>
                            {studentsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
                                <TableRow hover key={student.id} sx={{ bgcolor: '#dcedc8' }}>

                                    <TableCell sx={{ minWidth: '260px' }}>
                                        <Grid container>

                                            {/* avatar */}
                                            <Grid item>
                                                <Avatar alt={student.name} src='.' sx={{ bgcolor: '#a1887f', color: 'white' }} />
                                            </Grid>

                                            <Grid item sx={{ pl: 2 }}>

                                                {/* name */}
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 1 }}>
                                                    {student.name}
                                                </Typography>

                                                {/* detils button */}
                                                <Button variant="contained" size="medium" sx={{
                                                    textTransform: 'none',
                                                    height: 26, mx: 1, backgroundColor: '#f57c00',
                                                    '&:hover': { backgroundColor: '#a1887f' }
                                                }}
                                                    onClick={() => navigate(`/home/students/details/${student.id}`)}
                                                >
                                                    Details
                                                </Button>

                                            </Grid>
                                        </Grid>
                                    </TableCell>

                                    <TableCell>
                                        <Typography>{student.email}</Typography>
                                        <Typography>{student.phone}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{student.gender}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography noWrap>{student.joinDate}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{student.mark}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{student.status}</Typography>
                                    </TableCell>
                                </TableRow>))}
                        </TableBody>
                    </Table>

                    {/* pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={studentsList.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Container>

        </Paper>
    )
}