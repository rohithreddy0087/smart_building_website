import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Box } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Api = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="md" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Site Details
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
        Following table provides site information
        </Typography>
        <SiteTable/>

      </Container>
    </Box>
    );
}

function createData(name, id, desc) {
  return { name, id, desc};
}

const rows = [
  createData('Multipurpose Building', 'NAE-01', 'This building is located at UCSD and consists of 86 rooms'),
];

function SiteTable() {
  return (
    <TableContainer component={Paper} sx={{ pt:5, pl:3, pr:3, pb:3}}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Building Name</strong></TableCell>
            <TableCell align="right"><strong>Site ID</strong></TableCell>
            <TableCell align="right"><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Api;