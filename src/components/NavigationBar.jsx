import React from 'react';
import { 
  BottomNavigation,
  BottomNavigationAction,
  Paper
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import BugReportRoundedIcon from '@mui/icons-material/BugReportRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

function NavigationBar() {
  const curDir = useLocation().pathname;
  console.log(curDir)
  const [selectedDir, setSelectedDir] = React.useState(curDir);
  const handleDirChange = (event, newValue) => {
    setSelectedDir(newValue);
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={6}>
      <BottomNavigation value={selectedDir} onChange={handleDirChange}>
          <BottomNavigationAction
            component={Link}
            to="/"
            label="Home"
            value="/"
            icon={<HomeRoundedIcon />}
          >
          </BottomNavigationAction>
        <BottomNavigationAction
          component={Link}
          to="bugtrack"
          label="Bugs"
          value="/bugtrack"
          icon={<BugReportRoundedIcon />}
        />
        <BottomNavigationAction
          label="Info"
          value="/info"
          icon={<InfoRoundedIcon />}
        />
      </BottomNavigation>
    </Paper>
  )
}

export default NavigationBar