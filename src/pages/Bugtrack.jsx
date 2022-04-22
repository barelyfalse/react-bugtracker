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
  const [onHoldBugs, setOnHoldBugs] = useStoragedProject(curProj, 'onhold', []);
  const [openBugs, setOpenBugs] = useStoragedProject(curProj, 'open', []);
  const [onProgressBugs, setOnProgressBugs] = useStoragedProject(curProj, 'onprogress', []);

  const palette = useTheme().palette;
  const onMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [newBugDiagOpen, setNewBugDiagOpen] = React.useState(false);

  const handleNewBugClickOpen = () => {
    setNewBugDiagOpen(true);
  };

  const handleNewBugClose = (newBug) => {
    if(newBug) {
      placeBug(newBug, 'onhold');
    }
    setNewBugDiagOpen(false);
  }

  //move bug 
  const handleBugMove = (bugId, source, destination) => {
    if(bugId && source && destination) {
      let bugToMove = {};
      console.log('triying to move ' + bugId + ' from ' + source + ' to ' + destination);
      switch(source) {
        case 'open':
          setOpenBugs(prevBugs => {
            const bugIndex = prevBugs.findIndex(bug => bug.id === bugId);
            let newBugs = [...prevBugs];
            bugToMove = newBugs.splice(bugIndex, 1)[0];
            return newBugs;
          });
          break;
        case 'onhold':
          setOnHoldBugs(prevBugs => {
            const bugIndex = prevBugs.findIndex(bug => bug.id === bugId);
            let newBugs = [...prevBugs];
            bugToMove = newBugs.splice(bugIndex, 1)[0];
            return newBugs;
          });
          break;
        default:
          console.log('Error removing bug, unknown source');
          break;
      }
      placeBug(bugToMove, destination);
    }
  }

  const placeBug = (bug, destination) => {
    switch(destination) {
      case 'open':
        setOpenBugs(prevBugs => {
          if(!prevBugs) {
            prevBugs = []
          }
          let newBugs = [...prevBugs, bug];
          return newBugs;
        })
        break;
      case 'onhold':
        setOnHoldBugs(prevBugs => {
          if(!prevBugs) {
            prevBugs = []
          }
          let newBugs = [...prevBugs, bug];
          return newBugs;
        })
        break;
      default:
        console.log('Error placing bug, unknow destination');
        break;
    }
  }

  return (
    <Container maxWidth="xl" sx={{mt: '2ch', overflow: 'hidden', pb: '10ch'}}>
      
      <Stack
        direction="row"
      >
        <Typography variant="h5" >{projectName}</Typography>
      </Stack>
      <Grid container spacing={{xl: 4, sm: 2, xs: 1}} rowSpacing={4}>
        <TrackerColumn 
          type="open" 
          title="Abierto" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.open}
          bugs={openBugs}
          handleBugMove={handleBugMove}/>
        <TrackerColumn 
          type="inprogress" 
          title="En progreso" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.inprogress}
          handleBugMove={handleBugMove}/>
        <TrackerColumn 
          type="tobetested" 
          title="Para ser probado" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.tobetested}
          handleBugMove={handleBugMove}/>
        <TrackerColumn 
          type="onhold" 
          title="En espera" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.onhold}
          bugs={onHoldBugs}
          handleBugMove={handleBugMove}/>
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