import * as React from 'react';
import * as yup from 'yup';
import { useFormik } from "formik";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';
import { StudentsList } from '../../data/studentsData.js'
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';


// function component for create student
export default function CreateStudent() {

    const navigate = useNavigate();

    // initial values
    const initialValues = {
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        mark: "",
        status: "",
        workExperience: "",
        joinDate: Date(),
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
        mark: yup
            .number()
            .typeError('should be number')
            .required("required")
            .max(100, "max mark 100"),
        status: yup
            .string()
            .required("required"),
        workExperience: yup
            .number()
            .typeError('in numbers')
            .required("required"),
        joinDate: yup
            .date()
            .typeError('not a valid date')
            .required("required")
            .nullable(),
    })

    // onsubmit function
    const onSubmit = (value) => {

        let index = StudentsList.length;
        // finding max id in list
        let maxId = Math.max(...StudentsList.map(s => parseInt(s.id)));
        // creating new id
        let id = (maxId + 1).toString();
        // getting date from date object
        let date = value.joinDate;
        let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let joinDate = dd + "-" + mm + "-" + date.getFullYear();
        // new student object
        const newStudent = { id, ...value, joinDate };
        // adding to list
        StudentsList.splice(index, 0, newStudent);
        alert('New Student Added Successful');
        navigate('/home/students');

    }

    // formik 
    const formik = useFormik({ initialValues, validationSchema, onSubmit })

    return (
        <Paper sx={{
            minHeight: '85vh', backgroundColor: '#F5F5F5', display: 'flex',
            alignItems: 'center', justifyContent: 'center', p: 3,
        }}>
            <Box component={Paper} sx={{
                p: 5, maxWidth: '1100px', display: 'flex',
                flexDirection: 'column', alignItems: 'center'
            }}>

                {/* title & description */}
                <Typography variant='h5' sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Add New Student
                </Typography>
                <Typography sx={{ typography: 'body1' }}>&#x2772;fill the below form and click add&#x2773;</Typography>

                {/* form */}
                <form onSubmit={formik.handleSubmit}>
                    <Grid container paddingTop={6} pb={3} rowSpacing={3} columnSpacing={5}>

                        {/* name */}
                        <Grid item xs={12} sm={6}>

                            <TextField
                                required
                                fullWidth
                                id="name"
                                name="name"
                                label="Name"
                                autoComplete="name"
                                variant="outlined"
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
                                variant="outlined"
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
                                error={formik.errors.gender && formik.touched.gender}
                            >
                                <InputLabel id="id_gender">Gender</InputLabel>
                                <Select
                                    labelId="id_gender"
                                    id="gender"
                                    name="gender"
                                    lable="Gender"
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
                                variant="outlined"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.phone && formik.touched.phone ? formik.errors.phone : ""}
                                error={formik.errors.phone && formik.touched.phone}
                            />
                        </Grid>

                        {/* email */}
                        <Grid item xs={12} sm={5}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                label="Email Id"
                                autoComplete="email"
                                variant="outlined"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                                error={formik.errors.email && formik.touched.email}
                            />
                        </Grid>

                        {/* mark */}
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                fullWidth
                                id="mark"
                                name="mark"
                                label="Mark"
                                autoComplete="mark"
                                variant="outlined"
                                value={formik.values.mark}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.mark && formik.touched.mark ? formik.errors.mark : ""}
                                error={formik.errors.mark && formik.touched.mark}
                            />
                        </Grid>

                        {/* employment status */}
                        <Grid item xs={12} sm={4}>
                            <FormControl
                                fullWidth
                                required
                                variant="outlined"
                                error={formik.errors.status && formik.touched.status}
                            >
                                <InputLabel id="status">Employment Status</InputLabel>
                                <Select
                                    labelId="status"
                                    id="status"
                                    name="status"
                                    defaultValue=""
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <MenuItem value='employed'>Employed</MenuItem>
                                    <MenuItem value='unemployed'>Unemployed</MenuItem>
                                </Select>
                                <FormHelperText>
                                    {formik.errors.status && formik.touched.status ? formik.errors.status : ""}
                                </FormHelperText>
                            </FormControl>
                        </Grid>

                        {/* work experience */}
                        <Grid item xs={12} sm={4}>
                            <TextField
                                required
                                fullWidth
                                id="workExperience"
                                name="workExperience"
                                label="Work Experience"
                                autoComplete="workExperience"
                                variant="outlined"

                                value={formik.values.workExperience}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                helperText={formik.errors.workExperience && formik.touched.workExperience ? formik.errors.workExperience : ""}
                                error={formik.errors.workExperience && formik.touched.workExperience}
                            />
                        </Grid>

                        {/* join date */}
                        <Grid item xs={12} sm={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    required
                                    disableFuture
                                    id="joinDate"
                                    name="joinDate"
                                    label="joinDate"
                                    variant="inline"
                                    inputFormat="dd/MM/yyyy"
                                    size="small"
                                    inputVariant="standard"
                                    value={formik.values.joinDate}
                                    onBlur={formik.handleBlur}
                                    onChange={(value) => formik.setFieldValue("joinDate", value, true)}
                                    renderInput={(params) => (
                                        < TextField
                                            fullWidth
                                            helperText={formik.errors.joinDate}
                                            error={formik.errors.joinDate}
                                            {...params}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                    </Grid>

                    {/* submit button */}
                    <Button variant='contained' type="submit">Add Student</Button>

                </form>

            </Box>
        </Paper >
    );
}