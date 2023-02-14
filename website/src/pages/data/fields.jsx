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

const Fields = () => {
    
    return (
    <Box mt={2} mr={'auto'} ml={'auto'} pt={3} pb={3} maxWidth="md" backgroundColor = {"#eeeeee"}>
      <Container maxWidth="lg" component="main" sx={{pt:3, pb:3}}>
        <Typography variant="h4" align="center" color="black" component="p" >
          Fields in Data
        </Typography>
        <Typography variant="h6" align="justify" color="black" component="p" >
          Following are the fields present in the data: 
        </Typography>
        <FieldsTable/>
        <Typography variant="h6" align="justify" color="black" component="p" >
          Following are the different features present in the data: 
        </Typography>
        <FeaturesTable/>
      </Container>
    </Box>
    );
}

function createData(name, desc, unit) {
  return { name, desc, unit};
}

function createFieldData(name, type, desc) {
  return { name, type, desc};
}

const fields = [
  createFieldData('room_id','string','Room number'),
  createFieldData('recorded_features','list','List of features recorded for a particular room'),
  createFieldData('uuid','string','Unique identifier for each room and its corresponding features'),
  createFieldData('data','list','List of data recorded for an uuid'),
  createFieldData('time','datetime','Timestamp when the data recorded'),
  createFieldData('value','float','Value the data recorded')
]

const rows = [
createData('Zone Temperature','The temperature of a specific zone or area within a building.','degreesFahrenheit'),
createData('Warm/Cool Adjust','A feature that adjusts the temperature setpoint in a specific zone to be either warmer or cooler.', 'degreesFahrenheit'),
createData('Supply Vol Press','The pressure of the air or other fluid being supplied to the building.', 'inchesOfWater'),
createData('Actual Cooling Setpt','The temperature setpoint for cooling in a specific zone or area, as determined by a building management system.','degreesFahrenheit'),
createData('Actual Heating Setpt','The temperature setpoint for heating in a specific zone or area, as determined by a building management system.','degreesFahrenheit'),
createData('Actual Damper Position','The position of a damper, which controls the flow of air or other fluid into a specific zone or area, as determined by a building management system.', 'percent'),
createData('Actual Supply Flow','The actual flow rate of air or other fluid being supplied to a specific zone or area.', 'cubicFeetPerMinute'),
createData('Reheat Valve Command','A command sent by a building management system to control the position of a reheat valve, which regulates the temperature of air or other fluid being supplied to a specific zone or area.','percent'),
createData('Common Setpoint','A temperature setpoint that is applied to multiple zones or areas within a building, as determined by a building management system.','degreesFahrenheit'),
createData('Damper Command','A command sent by a building management system to control the position of a damper, which regulates the flow of air or other fluid into a specific zone or area.', 'percent'),
createData('Actual Sup Flow SP','The setpoint for the flow rate of air or other fluid being supplied to a specific zone or area, as determined by a building management system.', 'cubicFeetPerMinute'),
createData('Cooling Max Flow','The maximum flow rate of air or other fluid that can be supplied for cooling in a specific zone or area, as determined by a building management system.', 'cubicFeetPerMinute'),
createData('Occupied Clg Min','The minimum flow rate of air or other fluid that must be supplied for cooling when a specific zone or area is occupied, as determined by a building management system.', 'cubicFeetPerMinute'),
createData('Occupied Htg Flow','The flow rate of air or other fluid that must be supplied for heating when a specific zone or area is occupied, as determined by a building management system.', 'cubicFeetPerMinute'),
createData('Cooling Command','A command sent by a building management system to control the flow rate of air or other fluid being supplied for cooling in a specific zone or area.', 'percent'),
createData('Heating Command','A command sent by a building management system to control the flow rate of air or other fluid being supplied for heating in a specific zone or area.', 'percent'),
createData('Occupied Command','A command sent by a building management system to indicate whether a specific zone or area is currently occupied.', 'percent'),
createData('Occupied Status','The current status of a specific zone or area, indicating whether it is currently occupied or not', 'Binary, either 1 or o')
];

function FeaturesTable() {
  return (
    <TableContainer component={Paper} sx={{ pt:5, pl:3, pr:3, pb:3}}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><strong>Feature</strong></TableCell>
            <TableCell ><strong>Description</strong></TableCell>
            <TableCell ><strong>Meausred in</strong></TableCell>
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
              <TableCell>{row.desc}</TableCell>
              <TableCell>{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function FieldsTable() {
  return (
    <TableContainer component={Paper} sx={{ pt:5, pl:3, pr:3, pb:3}}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell ><strong>Field</strong></TableCell>
            <TableCell ><strong>Type</strong></TableCell>
            <TableCell ><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.type}</TableCell>
              <TableCell>{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Fields;