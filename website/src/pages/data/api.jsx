import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


const Api = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="lg" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          API Details
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        The API provides programmatic access to the dataset. 


        </Typography>
      </Container>
    </Box>
    );
}

export default Api;