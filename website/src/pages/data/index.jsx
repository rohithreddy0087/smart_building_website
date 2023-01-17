import React, { Component } from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


import Hero from '../../components/Hero';
import About from './about';
import Cite from './cite';
import Web from './web';
import Api from './api';
import Fields from './fields';


const styles = {
  buttonStyle: {
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3c52b2',
    '&:hover': {
      backgroundColor: '#3c52b2',
      color: '#fff',
    },
    borderRadius: 5,
    borderColor: ''
  }
};

function Item({ text }) {
  if (text === "about") {
    return <About />;
  }
  else if (text === "citing") {
    return <Cite />;
  }
  else if (text === "web") {
    return <Web />;
  }
  else if (text === "api") {
    return <Api />;
  }
  else if (text === "fields") {
    return <Fields />;
  }
  return <About />;
}

class Data extends Component {
  constructor(props) {
    super(props);
    this.state = {showLayer : "about", text1 : "Dataset", text2 : ""}
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(layer){
    this.setState({showLayer : layer})
  }

  render() {
    return (
      <Box>
      <Hero heading={this.state.text1} caption={this.state.text2} />
      <Box m={2} pt={3}>      
        <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{pt:4,pd:4}}>
            <Grid item xs={1.2}>
              <Button onClick={this.handleClick.bind(this,'about')} fullWidth variant="outlined" sx={styles.buttonStyle}>
                <Typography variant="button" color="inherit" noWrap sx={{flexGrow: 1 }}>
                About
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={1.2}>
              <Button onClick={this.handleClick.bind(this,'web')} fullWidth variant="outlined" sx={styles.buttonStyle}>
                <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Web Interface
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={1.2}>
              <Button onClick={this.handleClick.bind(this,'api')} fullWidth variant="outlined" sx={styles.buttonStyle}>
                <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                API
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={1.2}>
              <Button onClick={this.handleClick.bind(this,'fields')} fullWidth variant="outlined" sx={styles.buttonStyle}>
                <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Fields
                </Typography>
              </Button>
            </Grid>
            <Grid item xs={1.2}>
              <Button onClick={this.handleClick.bind(this,'citing')} fullWidth variant="outlined" sx={styles.buttonStyle}>
                <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                Citing
                </Typography>
              </Button>
            </Grid>
          </Grid>
        <Item text = {this.state.showLayer}/>
      </Box>
    </Box>
    );
  }
}




// const Data = () => {
//     const text1 = "Dataset";
//     const text2 = "";
//     var showLayer = "about";
//     function activateLayer(layer){
//         showLayer = layer;
//     }
//     return (
//     <Box>
//       <Hero heading={text1} caption={text2} />      
//       <Grid container direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{pt:4,pd:4}}>
//           <Grid item xs={1.2}>
//             <Button onClick={activateLayer('about')} fullWidth variant="outlined" sx={styles.buttonStyle}>
//               <Typography variant="button" color="inherit" noWrap sx={{flexGrow: 1 }}>
//               About
//               </Typography>
//             </Button>
//           </Grid>
//           <Grid item xs={1.2}>
//             <Button onClick={activateLayer('web')} fullWidth variant="outlined" sx={styles.buttonStyle}>
//               <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//               Web Interface
//               </Typography>
//             </Button>
//           </Grid>
//           <Grid item xs={1.2}>
//             <Button onClick={activateLayer('api')} fullWidth variant="outlined" sx={styles.buttonStyle}>
//               <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//               API
//               </Typography>
//             </Button>
//           </Grid>
//           <Grid item xs={1.2}>
//             <Button onClick={activateLayer('fields')} fullWidth variant="outlined" sx={styles.buttonStyle}>
//               <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//               Fields
//               </Typography>
//             </Button>
//           </Grid>
//           <Grid item xs={1.2}>
//             <Button onClick={activateLayer('citing')} fullWidth variant="outlined" sx={styles.buttonStyle}>
//               <Typography variant="button" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//               Citing
//               </Typography>
//             </Button>
//           </Grid>
//         </Grid>
//       <Item text = {showLayer}/>
//     </Box>
//     );
// }

export default Data;