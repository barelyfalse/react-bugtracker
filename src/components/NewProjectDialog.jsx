import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
} from '@mui/material';

function NewProjectDialog({open, onClose}) {
  const [projName, setProjName] = useState('')
  const handleNameChange = (event) => {
    setProjName(event.target.value);
  }

  const handleClose = () => {
    onClose(projName);
    setProjName('');
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Crear Nuevo Proyecto</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Para crear un nuevo proyecto primero ingrese el nombre.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre del proyecto"
          fullWidth
          variant="outlined"
          value={projName}
          onChange={handleNameChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Crear</Button>
      </DialogActions>
    </Dialog>
  )
}

NewProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default NewProjectDialog