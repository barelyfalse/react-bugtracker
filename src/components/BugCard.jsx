import React, { useState, useRef, createRef } from 'react'
import PropTypes from 'prop-types';
import {
  useTheme, 
  Box,
  Paper,
  Stack,
  Chip,
  IconButton,
  Typography,
  Tooltip
} from '@mui/material';

import BugOptionMenu from './BugOptionMenu';
import ProgressPie from './ProgressPie';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

function BugCard({bug, type, handleBugMove, handleBugDelete}) {
  const sevColors = useTheme().palette.severity;
  let severityColor;
  switch (bug.severity) {
    case 0: severityColor = sevColors.critical; break;
    case 1: severityColor = sevColors.normal; break;
    case 2: severityColor = sevColors.trivial; break;
    case 3: severityColor = sevColors.upgrade; break;
  }

  const date = new Date(bug.date);

  //optionmenu controllers
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const openMenu = Boolean(menuAnchorEl);
  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  //bug move controllers
  const handleMove = (destination) => {
    handleBugMove(bug.id, type, destination);
  }

  //bug delete
  const handleDelete = () => {
    handleBugDelete(bug.id, type);
  }


  return (
    <>
      <div style={{height: '15ch'}}>
        <Paper
          sx={{
            borderRadius: '1ch',
            p: '.5ch',
            boxShadow: '0',
            boxShadow: '0ch .5ch 1ch .2ch' + severityColor + '25',
            height: '14ch',
          }}
        >
          <Stack direction="row" sx={{}}>
            <Box 
              sx={{ 
                backgroundColor: severityColor, 
                width: '6px', 
                height: '12ch',
                borderRadius: '1ch',
                m: '.5ch',
              }}
            />
            <Box sx={{ml:'0.5ch', width: '1', height: '100%'}}>
              <Stack direction="column" justifyContent="space-between" sx={{height: '13ch'}}>
                <Box
                  sx={{overflow: "hidden", 
                    textOverflow: "ellipsis", 
                    
                  }}
                >
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">{bug.name}</Typography>
                    <Box>
                      <IconButton 
                        aria-label="menu" 
                        size="small"
                        id="menu-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleMenuClick}
                      >
                        <MoreVertRoundedIcon sx={{opacity: '.4'}}/>
                      </IconButton>
                    </Box>
                  </Stack>
                  <Box 
                    sx={{opacity: '.6'}}>
                    <Typography
                      sx={{
                        mr: '1ch',
                        textAlign: 'justify',
                        fontSize: '0.8rem'
                      }}>
                      {bug.description}
                    </Typography>
                  </Box>
                </Box>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <ProgressPie color={severityColor} progress={bug.progress}/>
                  <Tooltip title={date.toLocaleTimeString("es-US")} placement="left" arrow>
                    <Typography variant="caption" sx={{mr: '1ch', opacity: '.4'}}>{date.toLocaleDateString("es-US")}</Typography>
                  </Tooltip>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Paper>
      </div>
      <BugOptionMenu 
        anchorEl={menuAnchorEl}
        open={openMenu}
        onClose={handleMenuClose}
        bugType={type}
        handleMove={handleMove}
        handleDelete={handleDelete}
      />
    </>
  )
}

BugCard.propTypes = {
  bug: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  handleBugMove: PropTypes.func.isRequired,
  handleBugDelete: PropTypes.func.isRequired
}

export default BugCard