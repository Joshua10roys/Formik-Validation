import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { TeachersData } from "../../data/teachersData";

// header titles
const head = ['Name', 'Contact', 'Gender', 'Deparment', 'Students Rating'];

// function component
export default function Teachers() {

    const navigate = useNavigate();

    const [teachersData, setTeachersData] = useState([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // making the date in Alphabetical order
    useEffect(() => {
        let TeachersDataSorted = TeachersData.sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
        // setting date
        setTeachersData(TeachersDataSorted);
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
                    onClick={() => { navigate('/home/teachers/create') }}
                >Add New Teacher</Button>
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
                            {teachersData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((teacher) => (
                                <TableRow hover key={teacher.id} sx={{ bgcolor: '#ffcdd2' }}>

                                    <TableCell sx={{ minWidth: '260px' }}>
                                        <Grid container>

                                            {/* avatar */}
                                            <Grid item>
                                                <Avatar alt={teacher.name} src='.' sx={{ bgcolor: '#a1887f', color: 'white' }} />
                                            </Grid>

                                            <Grid item sx={{ pl: 2 }}>

                                                {/* name */}
                                                <Typography sx={{ fontWeight: 'bold', fontSize: '20px', mb: 1 }}>
                                                    {teacher.name}
                                                </Typography>

                                                {/* detils button */}
                                                <Button variant="contained" size="medium" sx={{
                                                    textTransform: 'none',
                                                    height: 26, mx: 1, backgroundColor: '#f57c00',
                                                    '&:hover': { backgroundColor: '#a1887f' }
                                                }}
                                                    onClick={() => navigate(`/home/teachers/details/${teacher.id}`)}
                                                >
                                                    Details
                                                </Button>

                                            </Grid>
                                        </Grid>
                                    </TableCell>

                                    <TableCell>
                                        <Typography>{teacher.email}</Typography>
                                        <Typography>{teacher.phone}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{teacher.gender}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography noWrap>{teacher.department}</Typography>
                                    </TableCell>

                                    <TableCell align="center">
                                        <Typography>{teacher.studentsRating}</Typography>
                                    </TableCell>

                                </TableRow>))}
                        </TableBody>
                    </Table>

                    {/* pagination */}
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={teachersData.length}
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