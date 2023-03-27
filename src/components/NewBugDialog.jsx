import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Typography,
} from '@mui/material';
import { v4 as uuid } from 'uuid';

function NewBugDialog({open, onClose}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cause, setCause] = useState('');
  const [solution, setSolution] = useState('');
  const [severity, setSeverity] = useState('');

  const itemStyle = { fontSize: '0.75em'};
  const listStyle = { marginTop: '0', marginBottom: '0', opacity:'0.7', fontWeight:'400'};

  const handleClose = () => {
    if(name === '' || description === '' || severity === '') {
      console.log('campos inclompletos')
      let newBug = {
        id: uuid(),
        name: 'something',
        severity: 2,
        description: uuid(),
        cause: cause,
        solution: solution,
        progress: 0,
        date: Date.now(),
        updates: [ { id: uuid(), timeStamp: Date.now, type: 1, text: "Added"} ]
      }
      
      onClose(newBug);
      return
    };
    
    let newBug = {
      id: uuid(),
      name: name,
      severity: severity,
      description: description,
      cause: cause,
      solution: solution,
      progress: 0,
      date: Date.now(),
      updates: [ { id: uuid(), timeStamp: Date.now, type: 1, text: "Added"} ]
    }
    
    onClose(newBug);
    
    setName('');
    setDescription('');
    setCause('');
    setSolution('');
    setSeverity('');
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>Añadir Bug</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Complete los campos para añadir un nuevo bug.
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              id="bugname"
              label="Nombre corto"
              helperText="Requerido"
              value={name}
              onChange={(event) => {setName(event.target.value)}}
              onBlur={(event) => {setName(event.target.value.trim())}}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              margin="dense"
              id="severity-select"
              select
              label="Severidad"
              value={severity}
              onChange={(event) => (setSeverity(event.target.value))}
              helperText="Requerido"
            >
              <MenuItem value="-1" disabled>Severidad</MenuItem>
              {
                ['Crítico', 'Normal', 'Trivial', 'Mejora'].map((text, index) => {
                  return <MenuItem key={index} value={index} >{text}</MenuItem> 
                })
              }
            </TextField>
          </Grid>
        </Grid>

        <TextField
          fullWidth
          multiline
          margin="dense"
          id="bugdescription"
          label="Descripción"
          placeholder="Descripción"
          value={description}
          onChange={(event) => (setDescription(event.target.value))}
          onBlur={(event) => {setDescription(event.target.value.trim())}}
        />
        <div>
          <Typography sx={{marginLeft:'1rem', opacity:'0.7'}} variant="caption">Procura incluir:</Typography>
          <ul style={listStyle}>
            <li style={itemStyle}>Comportamiento</li>
            <li style={itemStyle}>Mensajes de error</li>
            <li style={itemStyle}>Pasos para replicar</li>
          </ul>
        </div>
       
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              multiline
              margin="dense"
              id="bugcause"
              label="Posible causa"
              placeholder="Posible causa"
              value={cause}
              onChange={(event) => {setCause(event.target.value)}}
              onBlur={(event) => {setCause(event.target.value.trim())}}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <TextField
              fullWidth
              multiline
              margin="dense"
              id="bugsolution"
              label="Posible solución"
              placeholder="Posible solución"
              value={solution}
              onChange={(event) => {setSolution(event.target.value)}}
              onBlur={(event) => {setSolution(event.target.value.trim())}}
            />
          </Grid>
        </Grid>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleClose}>Agregar</Button>
      </DialogActions>
    </Dialog>
  )
}

NewBugDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default NewBugDialog