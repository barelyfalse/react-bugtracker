import * as React from 'react';
import { 
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Drawer,
  Paper,
  Stack,
  ButtonBase,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export function HeadBar() {
    const [drawerState, setDrawerState] = React.useState(false);

    let theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*
    User authorized state
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };
    */

    const toggleDrawer = (open) => (event) => {
      if ((event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) || mobile) {
        return;
      }
      setDrawerState(open);
    }

    const list = () => (
      <Box
        sx={{ width: 250}}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <Paper elevation={6} sx={{width: 1, height: '6ch', padding: '1ch', mb: '1ch'}}>
              <Stack direction="row" justify="center" alignItems="center" sx={{width: '100%', height: 1}}>
                <BugReportRoundedIcon color="primary" />
                <Typography variant="h6" component="div" color="primary" sx={{ flexGrow: 1 }}>
                  BugTracker
                </Typography>
              </Stack>
            </Paper>
          </ListItem>
          <Divider />
          <ListItem button key='home' component={Link} to="/">
            <ListItemIcon>
              <HomeRoundedIcon />   
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          
          <ListItem button key='bugtrack' component={Link} to="bugtrack">
            <ListItemIcon>
              <BugReportRoundedIcon />  
            </ListItemIcon>
            <ListItemText primary='Bugtracker' />
          </ListItem>
          <ListItem button key='info' component={Link} to="/">
            <ListItemIcon>
              <InfoRoundedIcon />  
            </ListItemIcon>
            <ListItemText primary='Info' />
          </ListItem>
        </List>
        <Divider />
      </Box>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>   
            <ButtonBase onClick={toggleDrawer(true)} >
              <BugReportRoundedIcon fontSize="large" color="primary" />
              <Typography variant="h6" component="div" color="primary">
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
