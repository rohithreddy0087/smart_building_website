import * as React from 'react';
import Box from '@mui/material/Box';

import Hero from '../../components/Hero';

import Page from './page';

const Register = () => {
    const text1 = "Account";
    const text2 = "";
  
    return (
    <Box>
      <Hero heading={text1} caption={text2} />   
      <Box m={2} pt={3}>  
      <Page/>
      </Box>   
    </Box>
    );
}

export default Register;