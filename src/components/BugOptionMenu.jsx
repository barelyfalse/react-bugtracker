import React from 'react'
import PropTypes from 'prop-types';

import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function BugOptionMenu({anchorEl, open, onClose, bugType, handleMove, handleDelete}) {
  const handleEditClick = () => {
    onClose();
  }
  const handleMoveClick = (des) => {
    handleMove(des)
    onClose();
  }
  const handleDeleteClick = () => {
    handleDelete();
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
        {bugType === 'onhold' || bugType === 'open' || bugType === 'onprogress' ? <Divider /> : null}
        {
          bugType === 'onhold' || bugType === 'open' || bugType === 'onprogress' ?
          <MenuItem disabled>
            <ListItemText><i>Mover a</i></ListItemText>
            <ListItemIcon>
              <ArrowForwardRoundedIcon fontSize="small" />
            </ListItemIcon>
          </MenuItem> :
          null
        }
        
        {
          bugType === 'onhold' ?
          <MenuItem onClick={() => handleMoveClick('open')}>
            <ListItemText>Abierto</ListItemText>
          </MenuItem> :
          null
        }
        {
          bugType === 'open' ?
          <MenuItem onClick={() => handleMoveClick('onprogress')}>
            <ListItemText>En progreso</ListItemText>
          </MenuItem> :
          null
        }
        {
          bugType === 'onprogress' ?
          <MenuItem onClick={() => handleMoveClick('tobetested')}>
            <ListItemText>Para ser probado</ListItemText>
          </MenuItem> :
          null
        }
        {
          bugType === 'onprogress' ?
          <MenuItem onClick={() => handleMoveClick('onhold')}>
            <ListItemText>En espera</ListItemText>
          </MenuItem> :
          null
        }
        {bugType === 'onhold' ? <Divider /> : null}
        {
          bugType === 'onhold' || (bugType === 'tobetested')? 
          <MenuItem onClick={handleDeleteClick}>
            <ListItemIcon>
              <DeleteForeverRoundedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Eliminar</ListItemText>
          </MenuItem> :
          null
        }
        
      </MenuList>
      </Menu>
    </Paper>
  );
};

BugOptionMenu.propTypes = {
  open: PropTypes.bool.isRequired, 
  onClose: PropTypes.func.isRequired,
  bugType: PropTypes.string.isRequired,
  handleMove: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
} 

export default BugOptionMenu