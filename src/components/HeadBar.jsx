import * as React from 'react';
import {
  useMediaQuery,
  useTheme,
  AppBar,
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Divider,
  Drawer,
  Paper,
  Stack,
  ButtonBase,
  Switch
} from '@mui/material';
import { Link } from 'react-router-dom';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

export function HeadBar({onLights}) {
    const [drawerState, setDrawerState] = React.useState(false);

    let theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => (event) => {
      if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || mobile) {
        return;
      }
      setDrawerState(open);
    }

    const [themeCheked, setThemeCheked] = React.useState(true);
    const handleThemeCheck = () => {
      setThemeCheked(!themeCheked);
      onLights(themeCheked);
    }

    const list = () => (
      <Box
        sx={{ width: 250}}
        role="presentation"
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <Paper 
              elevation={5}
              sx={{
                width: 1, 
                height: '6ch', 
                padding: '1ch', 
                mb: '1ch', 
                borderRadius: '1ch',
              }}
            >
              <Stack direction="row" justify="center" alignItems="center" sx={{width: '100%', height: 1}}>
                <BugReportRoundedIcon color="primary" />
                <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
                  BugTracker
                </Typography>
              </Stack>
            </Paper>
          </ListItem>
          <Divider />
          <ListItemButton key='home' component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <HomeRoundedIcon />   
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItemButton>
          
          <ListItemButton key='bugtrack' component={Link} to="bugtrack" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <BugReportRoundedIcon />  
            </ListItemIcon>
            <ListItemText primary='Bugtracker' />
          </ListItemButton>
          <ListItemButton key='info' component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemIcon>
              <InfoRoundedIcon />  
            </ListItemIcon>
            <ListItemText primary='Info' />
          </ListItemButton>
        </List>
        <Divider />
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} sx={{mt: '2ch'}}>
          <LightModeRoundedIcon />
          <Switch
            checked={themeCheked}
            onChange={handleThemeCheck}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <DarkModeRoundedIcon />
        </Stack>
        
      </Box>
    );

    return (
      <Box 
        sx={{ 
          flexGrow: 1,
          boxShadow: '0px 1ch 2ch ' + theme.palette.primary.main + '30'
        }}
      >
        <AppBar position="static">
          <Toolbar>   
            <ButtonBase onClick={toggleDrawer(true)} >
              <BugReportRoundedIcon fontSize="large" color={theme.palette.mode === 'dark' ? 'primary' : 'default'} />
              <Typography variant="h6" component="div" color={theme.palette.mode === 'dark' ? 'primary' : 'default'}>
                BugTracker
              </Typography>
            </ButtonBase>
          </Toolbar>
        </AppBar>
        <Drawer
          anchor={'left'}
          open={drawerState}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </Box>
    );
}
