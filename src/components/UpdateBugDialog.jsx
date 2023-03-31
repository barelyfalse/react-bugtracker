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
  const [name, setName] = useState('')
  const [severity, setSeverity] = useState(0)
  const [description, setDescription] = useState('')
  const [cause, setCause] = useState('')
  const [solution, setSolution] = useState('')
  const [progress, setProgress] = useState(0)
  const [updates, setUpdates] = useState([])
  const [update, setUpdate] = useState('')

  useEffect(() => {
    setName(bugToEdit.name)
    setSeverity(bugToEdit.severity)
    setDescription(bugToEdit.description)
    setCause(bugToEdit.cause)
    setSolution(bugToEdit.solution)
    setProgress(bugToEdit.progress)
    setUpdates(bugToEdit.updates)
  }, [bugToEdit]);

  const appendUpdate = (text, type) => {
    const curUpdates = [...updates];
    curUpdates.push({
      id: uuid(),
      text: text,
      timeStamp: Date.now(),
      type: type
    })
    setUpdates(curUpdates)
  }

  const handleClose = () => {
    onClose();
  }
  const handleUpdate = () => {
    /**
     * types
     * 1 - added
     * 2 - some field updated
     * 3 - severity updated
     * 4 - progress updated
     * 5 - update added
     * 6 - moved to another column 
     */
    let somethingUpdated = false;
    let updBug = {...bugToEdit}
    if(severity != bugToEdit.severity) {
      const s = ['crítico', 'normal', 'trivial', 'mejora']
      appendUpdate(`Severidad actualizada, ${s[bugToEdit.severity]} > ${s[severity]}`, 3)
      updBug.severity = severity
      somethingUpdated = true
    }
    if(description != bugToEdit.description) {
      appendUpdate('Descripción actualizada', 2)
      updBug.description = description
      somethingUpdated = true
    }
    if(cause != bugToEdit.cause) {
      appendUpdate('Posible causa actualizada', 2)
      updBug.cause = cause
      somethingUpdated = true
    }
    if(solution != bugToEdit.solution) {
      appendUpdate('Posible solución actualizada', 2)
      updBug.solution = solution
      somethingUpdated = true
    }
    if(progress != bugToEdit.progress) {
      appendUpdate('Progreso actualizado', 4)
      updBug.progress = progress
      somethingUpdated = true
    }
    if(update != "" && updates.length != bugToEdit.length) {
      appendUpdate('Actualización añadida', 5)
      updBug.updates = updates
      somethingUpdated = true
    }

    if(somethingUpdated) {
      console.log('Old bug')
      console.log(bugToEdit)
      onClose(updBug);
    } else {
      onClose()
    }

    
  }

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
          <Grid item xs={12}>
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
          </Grid>
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
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              margin="dense"
              id="bugupdate"
              label="Actualización"
              placeholder="Actualización"
              value={update}
              onChange={(event) => setUpdate(event.target.value)}
              onBlur={(event) => setUpdate(event.target.value.trim())}
            />
          </Grid>
          <Grid item xs={12}><Typography variant="caption" sx={{marginLeft: '0.8rem', opacity: '0.7'}}>Progreso</Typography></Grid>
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Slider
                value={typeof progress === 'number' ? progress : 0}
                onChange={(event) => setProgress(event.target.value)}
                aria-labelledby="input-slider"
                step={0.01}
                min={0}
                max={1}
                sx={{ml: '.5rem'}}
              />
              <ProgressPie color={useTheme().palette.primary.main} progress={progress} nolabel/>
              <Input
                value={Math.round(progress * 100)}
                size="small"
                onChange={(event) => {
                  setProgress(Number(event.target.value) / 100)
                }}
                onBlur={(event) => {
                  if (Number(event.target.value) > 100)
                    setProgress(1)
                  else if (Number(event.target.value) < 0)
                    setProgress(0) 
                }}
                inputProps={{
                  step: 1,
                  min: 0,
                  max: 100,
                  type: 'number',
                  'aria-labelledby': 'input-slider',
                }}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Historial de cambios</Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="column-reverse">
              {
                updates && updates.map((upd, index) => {
                  let date = new Date(upd.timeStamp)
                  if(upd.timeStamp > lastUpdDate) {
                    lastUpdDate = upd.timeStamp
                    return [
                      <Typography variant="caption" key={index+1000}>&#x2022;{` ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Typography>,
                      <Stack direction="row" key={index}>
                        <Typography variant="caption" sx={{opacity: '0.5'}}>&nbsp;&nbsp;&nbsp;&nbsp;{`- ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</Typography>
                        <Typography variant="caption">&nbsp;{upd.text}</Typography>
                      </Stack>
                    ]
                  } else {
                    return <Stack direction="row" key={index}>
                      <Typography variant="caption" sx={{opacity: '0.5'}}>&nbsp;&nbsp;&nbsp;&nbsp;{`- ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`}</Typography>
                      <Typography variant="caption">&nbsp;{upd.text}</Typography>
                    </Stack>
                  }
                })
              }
            </Stack>
          </Grid>
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