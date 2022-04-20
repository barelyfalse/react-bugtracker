import * as React from 'react';
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
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
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
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });
  const mobile = useMediaQuery(darkTheme.breakpoints.down('sm'));
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <HeadBar />
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
