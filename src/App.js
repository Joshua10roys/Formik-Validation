import * as React from 'react';
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography, IconButton, Button, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import Home from './pages/home.js';
import Students from './pages/student/students.js';
import CreateStudent from './pages/student/createStudent.js';
import StudentsDetails from './pages/student/studentDetails.js';
import EditStudent from './pages/student/editStudent.js';
import Teachers from './pages/teacher/teachers.js';
import CreateTeacher from './pages/teacher/createTeacher.js';
import TeacherDetails from './pages/teacher/teacherDetails.js';
import EditTeacher from './pages/teacher/editTeacher.js';


// custom button
const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 14,
  fontStyle: 'bolder',
  color: '#004d40',
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.4,
  backgroundColor: 'whitesmoke',
  borderColor: 'whitesmoke',
  fontFamily: "Segoe UI",
  '&:hover': {
    backgroundColor: 'whitesmoke',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'rgb(213,219,229)',
    borderColor: '#005cbf',
  },
});

// App function
function App() {

  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>

        {/* appbar */}
        <AppBar position="static" sx={{ bgcolor: '#00796b' }}>
          <Toolbar>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>

              {/* medu icon button for less than md screen  */}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              {/* options in less than md screen */}
              <Menu id="menu-appbar" anchorEl={anchorElNav} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)} onClose={handleCloseNavMenu} sx={{ display: { xs: 'block', md: 'none' } }}>

                <MenuItem onClick={() => {
                  handleCloseNavMenu();
                  navigate('/home');
                }}> Home</MenuItem>

                <MenuItem onClick={() => {
                  handleCloseNavMenu();
                  navigate('/home/teachers');
                }}> Teachers</MenuItem>

                <MenuItem onClick={() => {
                  handleCloseNavMenu();
                  navigate('/home/students');
                }}>Students</MenuItem>
              </Menu>

            </Box>

            {/* buttons on md screen */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <BootstrapButton variant="contained" onClick={() => navigate('/home')}>
                <HomeIcon sx={{ fontSize: 20 }} />&nbsp; Home
              </BootstrapButton>

              <BootstrapButton variant="contained" sx={{ ml: 3 }} onClick={() => navigate('/home/teachers')}>
                Teachers
              </BootstrapButton>

              <BootstrapButton variant="contained" sx={{ ml: 3 }} onClick={() => navigate('/home/students')}>
                Students
              </BootstrapButton>

            </Box>

            {/* title */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Student's &#38; Teachers's Management Dashboard
            </Typography>

          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
        {/* home route */}
        <Route path="/home" element={<Home />} />
        {/* teachers routes */}
        <Route path="/home/teachers" element={<Teachers />} />
        <Route path="/home/teachers/create" element={<CreateTeacher />} />
        <Route path="/home/teachers/details/:id" element={<TeacherDetails />} />
        <Route path="/home/teachers/edit/:id" element={<EditTeacher />} />
        {/* students routes */}
        <Route path="/home/students" element={<Students />} />
        <Route path="/home/students/create" element={<CreateStudent />} />
        <Route path="/home/students/details/:id" element={<StudentsDetails />} />
        <Route path="/home/students/edit/:id" element={<EditStudent />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Routes>

    </div>
  );
}

export default App;
