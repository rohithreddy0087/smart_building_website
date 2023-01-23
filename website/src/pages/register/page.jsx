import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

import axios from 'axios';

class Page extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleAfflChange = this.handleAfflChange.bind(this)
    this.handleAfflTypeChange = this.handleAfflTypeChange.bind(this)
    this.handleJobChange = this.handleJobChange.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleConPassChange = this.handleConPassChange.bind(this)
    this.Form = this.Form.bind(this)
    this.allTrue = this.allTrue.bind(this)
    this.AlertItem = this.AlertItem.bind(this)
    this.state = {
        firstName : '',
        lastName : '',
        affliation : '',
        affliationType : 'university',
        job: 'research',
        usermail : '',
        password : '',
        confirmPassword : '',
        response : ''
    };

    this.affliations = [
      {
        value: 'government',
        label: 'Government',
      },
      {
        value: 'industry',
        label: 'Industry',
      },
      {
        value: 'non-profit',
        label: "Non-Profit",
      },
      {
        value: 'university',
        label: "University",
      },

    ];

    this.jobs = [
        {
          value: 'data-scientist',
          label: 'Data Scientist',
        },
        {
          value: 'engineer',
          label: 'Engineer',
        },
        {
          value: 'grad-student',
          label: "Graduate Student",
        },
        {
          value: 'prof',
          label: "Professor",
        },
        {
          value: 'research',
          label: "Researcher",
        },
        {
          value: 'undergrad-student',
          label: "Undergraduate Student",
        }
  
    ];

    this.styles = {
      buttonStyle: {
        backgroundColor: '#3c52b2',
        align : "center",
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#3c52b2',
      },
      }
    };

    this.errors = {
        firstName : false,
        affliation : false,
        email: false,
        password: false,
        confirmPass: false,
        proxy:true
      };  

    
    
    this.isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  }

  allTrue(obj)
    {
      for(var o in obj)
          if(obj[o]) return true;
        
      return false;
    }

  handleFirstNameChange = (event) => {
    this.setState({firstName : event.target.value});
    if (event.target.value === "") {
        this.errors.firstName = true;
    }
    else{
        this.errors.firstName = false;
    }
  };
  handleLastNameChange = (event) => {
    this.setState({lastName : event.target.value});
  };
  handleAfflChange = event => {
    this.setState({affliation : event.target.value});
    if (event.target.value === "") {
        this.errors.affliation = true;
    }
    else{
        this.errors.affliation = false;
    }
  };
  handleAfflTypeChange = (event) => {
    this.setState({affliationType : event.target.value});
  };
  handleJobChange = (event) => {
    this.setState({job : event.target.value});
    // if (event.target.value === "") {
    //     this.errors.job = true;
    // }
    // else{
    //     this.errors.job = false;
    // }
  };
  handleUserChange = (event) => {
    this.setState({usermail : event.target.value});
    if (!this.isEmail(event.target.value)) {
        this.errors.email = true;
    }
    else{
        this.errors.email = false;
    }
  };
  handlePassChange = (event) => {
    this.setState({password : event.target.value});
    if (event.target.value.length < 7) {
        this.errors.password = true;
    }
    else{
        this.errors.password = false;
    }
  };
  handleConPassChange = event => {
    this.setState({confirmPassword : event.target.value});
    if (event.target.value === this.state.password) {
        this.errors.confirmPass = false;
        this.errors.proxy = false;
    }
    else{
        this.errors.confirmPass = true;
    }
  };
  

  handleClick = () => {
    console.log(this.state.firstName)
    console.log(this.state.lastName)
    console.log(this.state.affliation)
    console.log(this.state.affliationType)
    console.log(this.state.job)
    console.log(this.state.usermail)
    console.log(this.state.password)
    console.log(this.state.confirmPassword)

    axios.post("http://127.0.0.1:5000/api/register", this.state).then((response) => {
            this.setState({response : response.data.message});
    }).catch(error => {
      console.error('There was an error!', error);
      this.setState({response : error});
      });   
      
  }

  AlertItem() {
    console.log(this.state.response)
    if (this.state.response === "") {
      return null;
    }
    if(this.state.response === "New user added to database"){
     return ( 
      <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          User added — <strong>You can now download data without limit!! Please remember your password, it is not retrievable</strong>
      </Alert>
   );
    }
    else if (this.state.response === "User already exists"){
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          User already present — <strong>check whether your inputs are valid</strong>
        </Alert>
      );
    }
    else {
      return (
        <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
          Network issue— <strong>Try after sometime</strong>
      </Alert>
      );
    }
  }

  

  render() {
 
    return (
    <Box mt={2} mb={50} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="md" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="md" align="center" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Registration Form
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        Thank you for your interest in using Smart Building Data. By registering you help us demonstrate the usefulness of Smart Building-Data to the community, which helps keep the project open and free.

        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        By registering you agree to use Building-Data only for educational and research purposes. 
        </Typography>
        <this.Form />
        <this.AlertItem/>
        <Box align="center">
        <Button variant="outlined" onClick={this.handleClick} disabled={this.allTrue(this.errors)} sx={this.styles.buttonStyle}>
          <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Register
          </Typography>
        </Button>
        </Box>
        
      </Container>
    </Box>
    );
  }


  Form() {
    
    return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { mt: 1,mb:1, width: '100%' },
        pt:5,pb:5
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-first-name"
          label="First Name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
          onBlur={this.handleFirstNameChange}
          helperText={this.errors.firstName ? "This Field is Required" : ""}
          error={this.errors.firstName}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-last-name"
          label="Last Name"
        //   helperText="Please input the user last name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-email"
          label="Email"
          value={this.state.usermail}
          onChange={this.handleUserChange}
          onBlur={this.handleUserChange}
          helperText={this.errors.email ? "Enter a valid email address" : ""}
          error={this.errors.email}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-affliation"
          label="Affiliation"
          value={this.state.affliation}
          onChange={this.handleAfflChange}
          onBlur={this.handleAfflChange}
          helperText={this.errors.affliation ? "This Field is Required" : ""}
          error={this.errors.affliation}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-affiliation-type"
          select
          label="Affiliation Type"
          value={this.state.affliationType}
          onChange={this.handleAfflTypeChange}
        //   helperText={this.errors.affliationType ? "This Field is Required" : ""}
        //   error={this.errors.affliationType}
        >
          {this.affliations.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-job"
          select
          label="Job"
          value={this.state.job}
          onChange={this.handleJobChange}
        //   helperText={this.errors.job ? "This Field is Required" : ""}
        //   error={this.errors.job}
        >
          {this.jobs.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      
      <div>
        <TextField
          id="outlined-pass"
          label="Password"
          value={this.state.password}
          onChange={this.handlePassChange}
          onBlur={this.handlePassChange}
          type="password"
          autoComplete="current-password"
          helperText={this.errors.password ? "Minimum of 8 characters are required" : ""}
          error={this.errors.password}
        >
        </TextField>
      </div>

      <div>
        <TextField
          id="outlined-confirm-pass"
          label="Confirm Password"
          value={this.state.confirmPassword}
          onChange={this.handleConPassChange}
          onBlur={this.handleConPassChange}
          type="password"
          autoComplete="current-password"
          helperText={this.errors.confirmPass ? "Password doesn't match " : ""}
          error={this.errors.confirmPass}
        >
        </TextField>
      </div>

    </Box>
    );
  }
   
}
export default Page;