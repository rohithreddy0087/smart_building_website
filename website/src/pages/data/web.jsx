import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


class Web extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
    this.Form = this.Form.bind(this)
    this.state = {
        fromValue : dayjs('2020-08-21T00:00:00'),
        toValue : dayjs('2021-04-18T00:00:00'),
        lineValue : '100'
    };

    this.buildings = [
      {
          value: 'NAE-01',
          label: "Multipurpose Building",
      },
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
  }

  handleFromChange = (newValue) => {
    this.setState({fromValue : newValue});
  };
  handleToChange = (newValue) => {
    this.setState({toValue : newValue});
  };
  handleLineChange = event => {
  
    this.setState({lineValue : event.target.value});
  };

  handleClick(){
    console.log(this.state.fromValue);
    console.log(this.state.toValue)
    console.log(this.state.lineValue)
  }

  render() {
 
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="lg" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" align="center" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Download the Dataset
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        This interface provides an easy way to explore and download the building dataset. Simply fill in the fields you would like to filter over 
        and the session count above the form will update. When you are happy with your filters, click the download button below to get a json 
        file with all the relevant sessions. 
        </Typography>
        <this.Form />
        <Box align="center">
        <Button variant="outlined" sx={this.styles.buttonStyle}>
          <Typography onClick={this.handleClick} variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            Download
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
        '& .MuiTextField-root': { m: 1, width: '100%' },
        pt:5,pb:5
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-building"
          select
          label="Select Building"
          defaultValue="NAE-01"
          helperText="Please select the building site"
        >
          {this.buildings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="From Date&Time"
          value={this.state.fromValue}
          onChange={this.handleFromChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </div>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="To Date&Time"
          value={this.state.toValue}
          onChange={this.handleToChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
      </div>
      <div>
        <TextField
          id="outlined-select-line-limit"
          label="Lines"
          helperText="Please select the number of lines"
          value={this.state.lineValue}
          onChange={this.handleLineChange}
        >
        </TextField>
      </div>
    </Box>
    );
  }
}
export default Web;