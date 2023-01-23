import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


const Cite = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="md" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Citing the Dataset
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        If you use this Dataset in published work, we ask that you this Dataset so others can find and use the dataset as well.  

        </Typography>
      </Container>
    </Box>
    );
}

export default Cite;