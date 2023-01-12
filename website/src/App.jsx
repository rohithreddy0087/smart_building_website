import * as React from 'react';

import { Routes, Route } from "react-router-dom";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import indexImage from './assets/index.jpg'; // Import using relative path
import Home from './pages/home';
import Info from './pages/info';
import Research from './pages/research';
import Data from './pages/data';
import Register from './pages/register';
import Simulator from './pages/simulator';


const styles = {
  heroContainer: {
    backgroundImage:  'url('+ indexImage+')',
    backgroundSize: 'cover',
    backgroundPosition: '70% 1%',
    width: `calc(100vw + 48px)`,
  }
 };

function App() {
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <div className="app">
           
        <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/info" element={<Info />} />
              <Route path="/research" element={<Research />} />
              <Route path="/data" element={<Data />} />
              <Route path="/register" element={<Register />} />
              <Route path="/simulator" element={<Simulator />} />
            </Routes>
          </main>
      </div>
    </React.Fragment>
  );
}

export default App;