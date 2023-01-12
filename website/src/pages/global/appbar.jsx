import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const styles = {
  buttonStyle: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
  },
  },
  buttonStyleTool: {
    backgroundColor: 'transparent',
    color: 'black',
    '&:hover': {
      textDecoration: "underline red",
      textDecorationThickness: "6px",
      border: "none",
    },
    border: "none",
  }
};

const Appbar = () => {
  return (
      <AppBar
        position="static"
        color="transparent"
        sx={{background: 'transparent', boxShadow : 'none', pl:8, pr:8 }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
         
          <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            <Link
            variant="inherit"
            color="inherit"
            href="/"
            sx={{textDecoration: 'none'}}
            >
            Smart Building Modelling
            </Link>
            
          </Typography>
          <nav>
          <Button href="/" variant="outlined" sx={styles.buttonStyleTool}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Home
            </Typography>
          </Button>
          <Button href="/info" variant="outlined" sx={styles.buttonStyleTool}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Info
            </Typography>
          </Button>
          <Button href="/research" variant="outlined" sx={styles.buttonStyleTool}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Research
            </Typography>
          </Button>
          <Button href="/data" variant="outlined" sx={styles.buttonStyleTool}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Data
            </Typography>
          </Button>
          <Button href="/simulator" variant="outlined" sx={styles.buttonStyleTool}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Simulator
            </Typography>
          </Button>
          </nav>
          <Button href="/register" variant="outlined" sx={styles.buttonStyle}>
            <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Register
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
  );
}

export default Appbar;