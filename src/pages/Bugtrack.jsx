import React, {useState, useRef} from 'react';
import {
  useMediaQuery,
  useTheme, 
  Container,
  Typography,
  Stack,
  Grid
} from '@mui/material';
import {v4 as uuid} from 'uuid'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
  const [toBeTestedBugs, setToBeTestedBugs] = useStoragedProject(curProj, 'tobetested', []);
  const [closedBugs, setClosedBugs] = useStoragedProject(curProj, 'closed', []);

  const palette = useTheme().palette;
  const onMobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  const nodeRef = useRef(null);

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
      //console.log('triying to move ' + bugId + ' from ' + source + ' to ' + destination);
      const replaceBug = (prevBugs) => {
        const bugIndex = prevBugs.findIndex(bug => bug.id === bugId);
        let newBugs = [...prevBugs];
        bugToMove = newBugs.splice(bugIndex, 1)[0];
        return newBugs;
      }
      switch(source) {
        case 'open':
          setOpenBugs(prevBugs => replaceBug(prevBugs));
          break;
        case 'onprogress':
          setOnProgressBugs(prevBugs => replaceBug(prevBugs));
          break;
        case 'tobetested':
          setToBeTestedBugs(prevBugs => replaceBug(prevBugs));
          break;
        case 'onhold':
          setOnHoldBugs(prevBugs => replaceBug(prevBugs));
          break;
        case 'closed':
          setClosedBugs(prevBugs => replaceBug(prevBugs));
          break;
        default:
          console.log('Error removing bug, unknown source');
          break;
      }
      placeBug(bugToMove, destination);
    }
  }
  
  const placeBug = (bug, destination) => {
    const appendBug = (prevBugs) => {
      if(!prevBugs) {
        prevBugs = []
      }
      let newBugs = [...prevBugs, bug];
      return newBugs;
    }
    switch(destination) {
      case 'open':
        setOpenBugs(prevBugs => appendBug(prevBugs));
        break;
      case 'onprogress':
        setOnProgressBugs(prevBugs => appendBug(prevBugs));
        break;
      case 'tobetested':
        setToBeTestedBugs(prevBugs => appendBug(prevBugs));
        break;
      case 'onhold':
        setOnHoldBugs(prevBugs => appendBug(prevBugs));
        break;
      case 'closed':
        setClosedBugs(prevBugs => appendBug(prevBugs));
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
          type="onprogress" 
          title="En progreso" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.inprogress}
          bugs={onProgressBugs}
          handleBugMove={handleBugMove}/>
        <TrackerColumn 
          type="tobetested" 
          title="Para ser probado" 
          bgcolor={palette.bugcolumn.main} 
          accent={palette.state.tobetested}
          bugs={toBeTestedBugs}
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