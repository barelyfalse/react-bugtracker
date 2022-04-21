import * as React from 'react';
import PropTypes from 'prop-types';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';

const actions = [
  { icon: <AddRoundedIcon />, name: 'Add' },
  { icon: <FileDownloadRoundedIcon />, name: 'Download' },
];

function BugTrackerDial({onMobile}) {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: 'fixed', bottom: (onMobile ? 70 : 16), right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </SpeedDial>
  );
}

BugTrackerDial.propTypes = {
  onMobile: PropTypes.bool.isRequired,
}

export default BugTrackerDial;