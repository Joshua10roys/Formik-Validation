import * as React from 'react';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
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
import Stack from '@mui/material/Stack';


// function component for editing student
export default function EditStudent() {

    const navigate = useNavigate();

    // getting student id from params
    const { id } = useParams();

    // getting student object
    const student = StudentsList.find((student) => { if (student.id === id) { return student } });
    // finding object index
    const index = StudentsList.map(student => student.id).indexOf(id);

    // make date and month in format
    function dateFormate() {
        let dd = student.joinDate.split('-')
        let d = dd[1] + '-' + dd[0] + '-' + dd[2]
        return d
    }
    const date = dateFormate(student)

    // formik
    const formik = useFormik({

        // initial values
        initialValues: {
            name: student.name,
            age: student.age,
            gender: student.gender,
            phone: student.phone,
            email: student.email,
            mark: student.mark,
            status: student.status,
            workExperience: student.workExperience,
            joinDate: date,
        },

        // validationSchema
        validationSchema: yup.object({
            name: yup
                .string()
                .required("required")
                .min(3, "should be more than 3 characters")
                .max(25, "should be less than 25 characters"),
            age: yup
                .number()
                .required("required")
                .min(10, "looks not valid")
                .max(100, "looks not valid"),
            gender: yup
                .string()
                .required("required"),
            phone: yup
                .number()
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
                .required("required")
                .max(100, "max mark 100"),
            status: yup
                .string()
                .required("required"),
            workExperience: yup
                .number()
                .required("required"),
            joinDate: yup
                .date()
                .typeError()
                .required(),
        }),

        // on submit function
        onSubmit: (value) => {

            let id = student.id;
            let date = value.joinDate;
            // making updated date in format
            let dd = (date.getDate() < 10 ? '0' : '') + date.getDate();
            let mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
            let joinDate = dd + "-" + mm + "-" + date.getFullYear();
            // creating student  object
            const newStudent = { id, ...value, joinDate };
            // updating student
            StudentsList.splice(index, 1, newStudent);
            alert('Changes Saved Successful');
            navigate('/home/students');
        }
    })


    return (
        <Paper sx={{
            minHeight: '85vh', backgroundColor: '#F5F5F5', display: 'flex',
            alignItems: 'center', justifyContent: 'center', p: 3,
        }}>
            <Box component={Paper} sx={{
                p: 5, pb: 3, maxWidth: '1100px', display: 'flex',
                flexDirection: 'column', alignItems: 'center'
            }}>

                {/* title & description */}
                <Typography variant='h5' sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    Edit Student
                </Typography>
                <Typography sx={{ typography: 'body1' }}>
                    &#x2772;make the required changes and click Save Changes&#x2773;
                </Typography>

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
                                variant="outlined"
                                error={formik.errors.gender && formik.touched.gender}
                            >
                                <InputLabel id="gender">Gender</InputLabel>
                                <Select
                                    labelId="gender"
                                    id="gender"
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
                                    // disableFuture
                                    id="joinDate"
                                    name="joinDate"
                                    label="joinDate"
                                    variant="inline"
                                    inputFormat="dd/MM/yyyy"
                                    size="small"
                                    inputVariant="standard"
                                    value={formik.values.joinDate}
                                    onBlur={formik.handleBlur}
                                    onError={(res, val) => {
                                        console.log(res, val);
                                    }}
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

                        <Stack direction="row" pt={4} pl={5} spacing={2}>

                            {/* button edit */}
                            <Button variant="contained" onClick={() => { navigate(-1) }}>
                                Cancal
                            </Button>

                            {/* button save changes */}
                            <Button variant='contained' type='Submit' >
                                Save Changes
                            </Button>

                        </Stack>

                    </Grid>
                </form>
            </Box>
        </Paper>
    );
}