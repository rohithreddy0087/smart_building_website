import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


const About = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="lg" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          About the Dataset
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        Each entry in the dataset contains information about a single charging session. For more details on the data collected see the Fields and Sites tabs above.
        There are 3 ways to access the dataset.

            Web Interface - A simple way to download data as JSON files.
            REST API - A more flexible way to access data.
            Python API Client - A simple client for using the API in Python.


        </Typography>
      </Container>
    </Box>
    );
}

export default About;