import React, { Component } from 'react'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { default as ReactSelect } from "react-select";
import { components } from "react-select";

import MenuItem from '@mui/material/MenuItem';
import dayjs from 'dayjs';
import {DateTimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Option = (props) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

class Web extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.handleUserChange = this.handleUserChange.bind(this)
    this.handlePassChange = this.handlePassChange.bind(this)
    this.handleBuildingChange = this.handleBuildingChange.bind(this)
    this.handleFromChange = this.handleFromChange.bind(this)
    this.handleToChange = this.handleToChange.bind(this)
    this.handleLineChange = this.handleLineChange.bind(this)
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.Form = this.Form.bind(this)
    this.Dropdown = this.Dropdown.bind(this)
    // this.Option = this.Option.bind(this)
    this.state = {
        usermail : '',
        password : '',
        buildingName : '',
        fromValue : dayjs('2020-08-21T00:00:00'),
        toValue : dayjs('2021-04-18T00:00:00'),
        lineValue : '100',
        optionSelected: null
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

    this.colourOptions = [
      { value: "ocean1", label: "Ocean" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" },
      { value: "green", label: "Green" },
      { value: "forest", label: "Forest" },
      { value: "slate", label: "Slate" },
      { value: "silver", label: "Silver" }
    ];

  }

  handleUserChange = (event) => {
    this.setState({usermail : event.target.value});
  };
  handlePassChange = (event) => {
    this.setState({password : event.target.value});
  };
  handleBuildingChange = (event) => {
    this.setState({buildingName : event.target.value});
  };
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
    console.log(this.state.usermail)
    console.log(this.state.password)
    console.log(this.state.buildingName)
    console.log(this.state.fromValue)
    console.log(this.state.toValue)
    console.log(this.state.lineValue)
    console.log(this.state.optionSelected)
  }

  handleOptionChange = (selected) => {
    this.setState({
      optionSelected: selected
    });
  };

  

  render() {
 
    return (
    <Box mt={2} mb={50} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="md" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="md" align="center" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Download the Dataset
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        This interface provides an easy way to explore and download the building dataset. Simply fill in the fields you would like to filter over 
        and the session count above the form will update. When you are happy with your filters, click the download button below to get a json 
        file with all the relevant sessions. 
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        Without username and password, number of rows will be limited to 1000 only.
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
        '& .MuiTextField-root': { mt: 1,mb:1, width: '100%' },
        pt:5,pb:5
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-line-limit"
          label="User email"
          helperText="Please input the user email address"
          value={this.state.usermail}
          onChange={this.handleUserChange}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-line-limit"
          label="Password"
          helperText="Please input the password"
          value={this.state.password}
          onChange={this.handlePassChange}
        >
        </TextField>
      </div>
      <div>
        <TextField
          id="outlined-select-building"
          select
          label="Select Building"
          value={this.state.buildingName}
          onChange={this.handleBuildingChange}
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
      <div >
        <this.Dropdown />
      </div>
    </Box>
    );
  }


  Dropdown(){

    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        background: 'transparent',
        borderRadius: 5,
        borderColor: '#9e9e9e',
        minHeight: '60px',
        height: '60px',
        color: 'black',
        boxShadow: state.isFocused ? null : null,
        "&:hover": {
          border: "2px solid #0277bd",
        }
      }),
    }
    return (
      <span
        className="d-inline-block"
        data-toggle="popover"
        data-trigger="focus"
        data-content="Please select account(s)"
      >
        <ReactSelect
          options={this.colourOptions}
          isMulti
          closeMenuOnSelect={false}
          hideSelectedOptions={false}
          components={{
            Option
          }}
          onChange={this.handleOptionChange}
          allowSelectAll={true}
          value={this.state.optionSelected}
          placeholder = {"Select Features ...."}
          styles={customStyles}
        />
        {/* <FormHelperText>Please select required features</FormHelperText> */}
      </span>
      
    );
  }
}
export default Web;