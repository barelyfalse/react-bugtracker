import React, { useState } from 'react';
import {
  CssBaseline,
  useMediaQuery
} from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { HeadBar } from './components/HeadBar';
import NavigationBar from './components/NavigationBar';
import Bugtrack from './pages/Bugtrack';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  const [lights, setLights] = useState('dark');
  const switchTheme = (checked) => {
    if(checked) {
      setLights('light');
    } else {
      setLights('dark');
    }
  }
  const theme = createTheme({
    palette: {
      mode: lights,
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#ff4400',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        light: '#0066ff',
        main: '#00ff5e',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#ffcc00',
      },
      colorpro: {
        main: '#452e63'
      },
      contrastThreshold: 3,
      tonalOffset: 0.2,
    },
  });
  
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HeadBar onLights={switchTheme} />
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="bugtrack" element={ <Bugtrack /> }/>
          <Route path="*" element={ <NotFoundPage /> }/>
        </Routes>
        {
          mobile ?
          <NavigationBar /> :
          <></>
        }
      </ThemeProvider>
    </>
  );
}

export default App;
