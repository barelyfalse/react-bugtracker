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
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';

export function HeadBar() {
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [drawerState, setDrawerState] = React.useState(false);

    let theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'));

    /*
    User authorized state
    const handleChange = (event) => {
        setAuth(event.target.checked);
    };
    */
  
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };

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
          <ListItem button key='home' component={Link} to="/">
            <ListItemIcon>
              <BugReportRoundedIcon />   
            </ListItemIcon>
            <ListItemText primary='Home' />
          </ListItem>
          <Divider />
          <ListItem button key='bugtrack' component={Link} to="bugtrack">
            <ListItemIcon>
              <BugReportRoundedIcon />  
            </ListItemIcon>
            <ListItemText primary='Bugtracker' />
          </ListItem>
        </List>
        <Divider />
      </Box>
    );

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={toggleDrawer(true)} >
              <BugReportRoundedIcon fontSize="large" />
            </IconButton>
                    
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BugTracker
            </Typography>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>Account</MenuItem>
                </Menu>
              </div>
            )}
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
