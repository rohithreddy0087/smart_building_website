import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


const Fields = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="lg" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Fields in Data
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
            Following are the fields present in the data: 
        </Typography>
      </Container>
    </Box>
    );
}

export default Fields;