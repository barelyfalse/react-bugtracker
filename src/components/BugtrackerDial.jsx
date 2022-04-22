import * as React from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';



function BugTrackerDial({onMobile, newBug}) {
  const actions = [
    { icon: <AddRoundedIcon />, name: 'Add', action: newBug  },
    { icon: <FileDownloadRoundedIcon />, name: 'Download'},
  ];

  return (
    <SpeedDial
      ariaLabel="SpeedDial"
      sx={{ position: 'fixed', bottom: (onMobile ? 70 : 16), right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => {
        return (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
          />
        )
      })}
    </SpeedDial>
  );
}

BugTrackerDial.propTypes = {
  onMobile: PropTypes.bool.isRequired,
  newBug: PropTypes.func.isRequired,
}

export default BugTrackerDial;