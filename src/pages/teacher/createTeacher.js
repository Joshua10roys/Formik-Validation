import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { TeachersData } from '../../data/teachersData';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';


// function component for create teacher
export default function CreateTeacher() {

    const navigate = useNavigate();

    // initial values
    const initialValues = {
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        department: "",
        field: "",
        yearsOfExperience: "",
        studentsRating: "",
    }

    // validationSchema
    const validationSchema = yup.object({
        name: yup
            .string()
            .required("required")
            .min(3, "should be more than 3 characters")
            .max(25, "should be less than 25 characters"),
        age: yup
            .number()
            .typeError('should be number')
            .required("required")
            .min(10, "looks not valid")
            .max(100, "looks not valid"),
        gender: yup
            .string()
            .required("required"),
        phone: yup
            .number()
            .typeError('should be number')
            .required("required")
            .typeError("must be number")
            .positive("looks not valid one")
            .integer("looks not valid one"),
        email: yup
            .string()
            .required("required")
            .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "not a valid id"),
        department: yup
            .string()
            .required("required"),
        field: yup
            .string()
            .required("required"),
        yearsOfExperience: yup
            .number()
            .typeError('in numbers')
            .required("required"),
        studentsRating: yup
            .number()
            .typeError('should be number')
            .required("required")
            .max(5, 'max is 5 only')
    })

    // onsubmit function
    const onSubmit = (value) => {

        let index = TeachersData.length;
        // finding max id in list
        let maxId = Math.max(...TeachersData.map(t => parseInt(t.id)));
        // creating new id
        let id = (maxId + 1).toString();
        // new teacher object
        const newTeacher = { id, ...value };
        // adding to list
        TeachersData.splice(index, 0, newTeacher);
        alert('New Teacher Added Successful');
        navigate('/home/teachers');
    }

    // formik 
    const formik = useFormik({ initialValues, validationSchema, onSubmit, })

    return (
        <Paper sx={{ minHeight: '90vh', backgroundColor: '#F5F5F5', display: 'flex', alignItems: 'center', p: 2 }}>
            <Container component={Paper} sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* title & description */}
                <Typography variant='h5' sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Add New Student
                </Typography>
                <Box sx={{ typography: 'body1' }}>&#x2772;fill the below form and click add&#x2773;</Box>

                {/* form */}
                <form onSubmit={formik.handleSubmit}>
                    <Grid container paddingY={3} paddingX={5} rowSpacing={4} columnSpacing={6}>

                        {/* name */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                autoComplete="given-name"
                                variant="standard"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.name && formik.touched.name ? formik.errors.name : ""}
                                error={formik.errors.name && formik.touched.name}
                            />
                        </Grid>

                        {/* age */}
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                id="age"
                                name="age"
                                label="Age"
                                autoComplete="given-age"
                                variant="standard"
                                value={formik.values.age}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.age && formik.touched.age ? formik.errors.age : ""}
                                error={formik.errors.age && formik.touched.age}
                            />
                        </Grid>

                        {/* gender */}
                        <Grid item xs={12} sm={3}>
                            <FormControl
                                fullWidth
                                required
                                variant="standard"
                                error={formik.errors.gender && formik.touched.gender}>
                                <InputLabel id="id_gender">Gender</InputLabel>
                                <Select
                                    labelId="id_gender"
                                    id="gender"
                                    label="Gender"
                                    name="gender"
                                    defaultValue=""
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <MenuItem value='male'>Male</MenuItem>
                                    <MenuItem value='female'>Female</MenuItem>
                                    <MenuItem value='others'>Others</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {formik.errors.gender && formik.touched.gender ? formik.errors.gender : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* phone */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id="phone"
                                name="phone"
                                label="Phone No."
                                autoComplete="phone"
                                variant="standard"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ""}
                                error={formik.errors.phone && formik.touched.phone}
                            />
                        </Grid>

                        {/* email */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Id"
                                autoComplete="email"
                                variant="standard"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                                error={formik.errors.email && formik.touched.email}
                            />
                        </Grid>

                        {/* department */}
                        <Grid item xs={12} sm={4}>
                            <FormControl
                                fullWidth
                                required
                                variant="standard"
                                error={formik.errors.department && formik.touched.department}>
                                <InputLabel id="department">Department</InputLabel>
                                <Select
                                    labelId="department"
                                    id="department"
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='teaching'>Teaching</MenuItem>
                                    <MenuItem value='placement'>Placement</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {formik.errors.department && formik.touched.department ? formik.errors.department : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* field */}
                        <Grid item xs={12} sm={4}>
                            <FormControl
                                fullWidth
                                required
                                variant="standard"
                                error={formik.errors.field && formik.touched.field}>
                                <InputLabel id="field">Field</InputLabel>
                                <Select labelId="field" id="field" name="field" defaultValue=""
                                    value={formik.values.field}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}>
                                    <MenuItem value='developer'>Developer</MenuItem>
                                    <MenuItem value='testing'>Testing</MenuItem>
                                    <MenuItem value='security'>Security</MenuItem>
                                    <MenuItem value='network'>Network</MenuItem>
                                    <MenuItem value='support'>Support</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {formik.errors.field && formik.touched.field ? formik.errors.field : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* yearsOfExperience */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id="yearsOfExperience"
                                name="yearsOfExperience"
                                label="Experience"
                                autoComplete="yearsOfExperience"
                                variant="standard"
                                value={formik.values.yearsOfExperience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.yearsOfExperience && formik.touched.yearsOfExperience ? formik.errors.yearsOfExperience : ""}
                                error={formik.errors.yearsOfExperience && formik.touched.yearsOfExperience}
                            />
                        </Grid>

                        {/* studentsRating */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="studentsRating"
                                name="studentsRating"
                                label="Students Rating"
                                autoComplete="studentsRating"
                                variant="standard"
                                value={formik.values.studentsRating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.studentsRating && formik.touched.studentsRating ? formik.errors.studentsRating : ""}
                                error={formik.errors.studentsRating && formik.touched.studentsRating}
                            />
                        </Grid>

                        {/* button submit */}
                        <Grid item xs={12}>
                            <Button variant='contained' type='submit' >Add Teacher</Button>
                        </Grid>

                    </Grid>
                </form>
            </Container>
        </Paper>
    );
}