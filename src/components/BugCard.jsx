import React, { useRef } from 'react'
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
import { CSSTransition } from 'react-transition-group';
import BugOptionMenu from './BugOptionMenu'

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import '../css/bugcard.css'

function BugCard({bug}) {
  const nodeRef = useRef(null);
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

  return (
    <Box>
    <CSSTransition
      nodeRef={nodeRef}
      in={true}
      appear={true}
      timeout={300}
      classNames="fade"
    >
      <Paper
        ref={nodeRef}
        sx={{
          borderRadius: '1ch',
          p: '.5ch',
          boxShadow: '0',
          boxShadow: '0ch .5ch 1ch .2ch' + severityColor + '25',
          height: '14ch'
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
          <Box sx={{ml:'1ch', width: '1', height: '100%'}}>
            <Stack direction="column" justifyContent="space-between" sx={{height: '13ch'}}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography fontWeight="bold">{bug.name}</Typography>
                <Box>
                  <Tooltip title="Menú" arrow>
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
                  </Tooltip>
                </Box>
              </Stack>
              <Box 
                sx={{overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  opacity: '.6',
                }}
              >
                <Typography nowrap="true">{bug.description}</Typography>
              </Box>
              
              <Stack direction="row" justifyContent="end" sx={{mr: '1ch', opacity: '.4'}}>
                <Tooltip title={date.toLocaleTimeString("es-US")} placement="left" arrow>
                  <Typography variant="caption">{date.toLocaleDateString("es-US")}</Typography>
                </Tooltip>
              </Stack>
            </Stack>
          </Box>
        </Stack>
        
      </Paper>
    </CSSTransition>
    <BugOptionMenu 
          anchorEl={menuAnchorEl}
          open={openMenu}
          onClose={handleMenuClose}
        />
    </Box>
  )
}

BugCard.propTypes = {
  bug: PropTypes.object.isRequired,
}

export default BugCard