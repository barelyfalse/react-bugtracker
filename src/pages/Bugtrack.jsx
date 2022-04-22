import React from 'react';
import {
  useMediaQuery,
  useTheme, 
  Container,
  Typography,
  Stack,
  Grid
} from '@mui/material';
import { useStoragedProject, getCurrentProject } from '../useLocalStorage';
import TrackerColumn from '../components/TrackerColumn';
import BugTrackerDial from '../components/BugtrackerDial';
import NewBugDialog from '../components/NewBugDialog';


function Bugtrack() {
  const curProj = getCurrentProject();
  const [projectName, setProjectName] = useStoragedProject(curProj, 'name', '');
  const [onHoldBugs, setOnHoldBugs] = useStoragedProject(curProj, 'onhold', [])

  const palette = useTheme().palette;
  const onMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [newBugDiagOpen, setNewBugDiagOpen] = React.useState(false);

  const handleNewBugClickOpen = () => {
    setNewBugDiagOpen(true);
  };

  const handleNewBugClose = (newBug) => {
    if(newBug) {
      setOnHoldBugs(prevBugs => {
        let newBugs = [...prevBugs, newBug];
        return newBugs;
      })
    }
    setNewBugDiagOpen(false);
  }

  return (
    <Container maxWidth="xl" sx={{mt: '2ch'}}>
      
      <Stack
        direction="row"
      >
        <Typography variant="h5" >{projectName}</Typography>
      </Stack>
      <Grid container spacing={{xl: 4, sm: 2, xs: 1}} rowSpacing={4}>
        <TrackerColumn 
          type="open" 
          title="Abierto" 
          bgcolor={palette.bugcolumn.main + '07'} 
          accent={palette.state.open}
        />
        <TrackerColumn 
          type="inprogress" 
          title="En progreso" 
          bgcolor={palette.bugcolumn.main + '07'} 
          accent={palette.state.inprogress}/>
        <TrackerColumn 
          type="tobetested" 
          title="Para ser probado" 
          bgcolor={palette.bugcolumn.main + '07'} 
          accent={palette.state.tobetested}/>
        <TrackerColumn 
          type="onhold" 
          title="En espera" 
          bgcolor={palette.bugcolumn.main + '07'} 
          accent={palette.state.onhold}
          bugs={onHoldBugs}/>
      </Grid>
      <BugTrackerDial 
        onMobile={onMobile} 
        newBug={handleNewBugClickOpen}
      />
      <NewBugDialog 
        open={newBugDiagOpen} 
        onClose={handleNewBugClose} 
      />
    </Container>
  )
}

export default Bugtrack