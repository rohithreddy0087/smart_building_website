import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


const Cite = () => {
    
    return (
    <Box>
      <Container maxWidth="xl" component="main">
        <Typography variant="h4" align="justify" color="black" component="p" sx={{pt:4, pl: 8}}>
          Citing the Dataset
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" sx={{pl: 8}}>
        If you use this Dataset in published work, we ask that you this Dataset so others can find and use the dataset as well.  

        </Typography>
      </Container>
    </Box>
    );
}

export default Cite;