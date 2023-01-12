import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';


import indexImage from '../assets/index.jpg';
import Appbar from '../pages/global/appbar';


const styles = {
  heroContainer: {
    align:"center",
    backgroundImage:  'url('+ indexImage+')',
    backgroundSize: 'cover',
    backgroundPosition: '70% 11%',
    width: `calc(100vw + 48px)`,
    height: '400px'
  }
 };

 function Item({ text }) {
  if (text.length === 0) {
    return null;
  }
  return(
  <Typography variant="h5" align="center" color="black" component="p">
  {text}
  </Typography>);
}


 export default function Hero({heading,caption}) {
  return (
    <Box sx = {styles.heroContainer}> 
        <Appbar />
        <Container disableGutters component="main" align="center" sx={{pb: 6, pt: 8}}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="black"
            gutterBottom>
            {heading}
          </Typography>
          <Item text = {caption}/>
        </Container>
    </Box> 
  );
}