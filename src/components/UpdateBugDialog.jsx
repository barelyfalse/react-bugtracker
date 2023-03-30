import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
  useTheme,
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
  Slider,
  Input,
  Stack
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import ProgressPie from './ProgressPie';

function UpdateBugDialog({open, onClose, bugToEdit}) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [cause, setCause] = useState('');
  const [solution, setSolution] = useState('');
  const [severity, setSeverity] = useState(0);
  const [progress, setProgress] = useState(0);
  const [update, setUpdate] = useState('')
  const [progressRead, setProgressRead] = useState(0)

  const handleClose = () => {
    onClose();
  }
  const handleUpdate = () => {
    onClose();
  }

  const handleSliderChange = (event, newValue) => {
    setProgress(newValue);
    setProgressRead(Math.round(newValue * 100));
  };

  const handleInputChange = (event) => {
    setProgress(event.target.value === '' ? '' : Number(event.target.value / 100));
    setProgressRead(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (progressRead < 0) {
      setProgressRead(0);
    } else if (progressRead > 100) {
      setProgressRead(1);
    }
  };

  useEffect(() => {
    setName(bugToEdit.name)
    setDescription(bugToEdit.description)
    setCause(bugToEdit.cause)
    setSolution(bugToEdit.solution)
    setSeverity(bugToEdit.severity)
    setProgress(bugToEdit.progress)
    setProgressRead(bugToEdit.progress * 100)
  }, [bugToEdit]);

  let lastUpdDate = 0;

  return (
    <Dialog onClose={handleClose} open={open} scroll="paper" fullWidth>
      <DialogTitle>Actualizar {bugToEdit.visibleid}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Actualizando bug.
        </DialogContentText>
        <Grid container spacing={1}>
          <Grid item sm={6} xs={12}>
            <TextField
              disabled
              fullWidth
              margin="dense"
              id="bugname"
              label="Nombre corto"
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
          helperText="Requerido"
          value={description}
          onChange={(event) => (setDescription(event.target.value))}
          onBlur={(event) => {setDescription(event.target.value.trim())}}
        />

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
        <Grid container>
          
        </Grid>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              margin="dense"
              id="bugupdate"
              label="Actualización"
              placeholder="Actualización"
              value={update}
              onChange={(event) => (setUpdate(event.target.value))}
              onBlur={(event) => {setUpdate(event.target.value.trim())}}
            />
          </Grid>
          <Grid item xs={12}><Typography variant="caption" sx={{marginLeft: '0.8rem', opacity: '0.7'}}>Progreso</Typography></Grid>
          <Grid item style={{paddingTop: '4px', width: '4rem'}}>
            <ProgressPie color={useTheme().palette.primary.main} progress={progress} />
          </Grid>
          <Grid item xs>
            <Slider
              value={typeof progress === 'number' ? progress : 0}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
              step={0.01}
              min={0}
              max={1}
            />
          </Grid>
          <Grid item>
            <Input
              value={progressRead}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 1,
                min: 0,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        <Typography variant="h6">Historial de cambios</Typography>
        <Grid container>
          <Stack direction="column">
            {
              bugToEdit.updates && bugToEdit.updates.map((upd, index) => {
                let date = new Date(upd.timeStamp)
                if(upd.timeStamp > lastUpdDate) {
                  lastUpdDate = upd.timeStamp
                  return <Stack direction="column" key={index}>
                    <Typography variant="caption">&#x2022;{` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Typography>
                    <Stack direction="row">
                      <Typography variant="caption" sx={{opacity: '0.7'}}>&nbsp;&nbsp;&nbsp;&nbsp;{`- ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</Typography>
                      <Typography variant="caption">&nbsp;{upd.text}</Typography>
                    </Stack>
                  </Stack>
                } else {
                  console.log('nomas 2')
                  return <Stack direction="row" key={index}>
                    <Typography variant="caption" sx={{opacity: '0.7'}}>&nbsp;&nbsp;&nbsp;&nbsp;{`- ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</Typography>
                    <Typography variant="caption">&nbsp;{upd.text}</Typography>
                  </Stack>
                }
              })
            }
          </Stack>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleUpdate}>Actualizar</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateBugDialog