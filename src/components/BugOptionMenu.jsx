import React from 'react'
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';
import Cloud from '@mui/icons-material/Cloud';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

function BugOptionMenu({anchorEl, open, onClose}) {
  const handleEditClick = () => {
    onClose();
  }
  const handleMoveClick = (des) => {
    onClose();
  }

  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      <MenuList>
        <MenuItem onClick={handleEditClick}>
          <ListItemIcon>
            <EditRoundedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Editar</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem disabled>
          <ListItemText><i>Mover a</i></ListItemText>
          <ListItemIcon>
            <ArrowForwardRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <MenuItem onClick={handleMoveClick}>
          <ListItemText>Abierto</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoveClick}>
          <ListItemText>En progreso</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoveClick}>
          <ListItemText>Para ser probado</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMoveClick}>
          <ListItemText>En espera</ListItemText>
        </MenuItem>
      </MenuList>
      </Menu>
    </Paper>
  );
};

BugOptionMenu.propTypes = {
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired,
}

export default BugOptionMenu