import React from 'react';
import {
  useMediaQuery,
  useTheme, 
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { DragDropContext } from 'react-beautiful-dnd';
import { useStoragedProject, getCurrentProject } from '../useLocalStorage';
import TrackerColumn from '../components/TrackerColumn';
import BugTrackerDial from '../components/BugtrackerDial';
import NewBugDialog from '../components/NewBugDialog';
import Masonry from 'react-masonry-css'
import '../css/masonryColumns.css'


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
        console.log('Error placing bug, unknown destination');
        break;
    }
  }

  //delete bug
  const handleBugDelete = (bugId, source) => {
    const deleteBug = (prevBugs) => {
      const bugIndex = prevBugs.findIndex(bug => bug.id === bugId);
      let newBugs = [...prevBugs];
      newBugs.splice(bugIndex, 1);
      return newBugs;
    }
    switch(source) {
      case 'open':
        setOpenBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'onprogress':
        setOnProgressBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'tobetested':
        setToBeTestedBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'onhold':
        setOnHoldBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'closed':
        setClosedBugs(prevBugs => deleteBug(prevBugs));
        break;
      default:
        console.log('Error deleting bug, unknown source');
        break;
    }
  }

  function transferBug(source, sourceIdx, destination, destinationIdx) {
    if(!source || !destination) return;
    let transferedBug = {};
    const deleteBug = (prevBugs) => {
      let newBugs = [...prevBugs];
      newBugs.splice(sourceIdx, 1);
      return newBugs;
    }
    const appendBug = (prevBugs) => {
      if(!prevBugs) {
        prevBugs = []
      }
      let newBugs = [...prevBugs];
      newBugs.splice(destinationIdx, 0, transferedBug);
      return newBugs;
    }
    switch(source) {
      case 'open':
        transferedBug = openBugs[sourceIdx];
        setOpenBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'onprogress':
        transferedBug = onProgressBugs[sourceIdx];
        setOnProgressBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'tobetested':
        transferedBug = toBeTestedBugs[sourceIdx];
        setToBeTestedBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'onhold':
        transferedBug = onHoldBugs[sourceIdx];
        setOnHoldBugs(prevBugs => deleteBug(prevBugs));
        break;
      case 'closed':
        transferedBug = closedBugs[sourceIdx];
        setClosedBugs(prevBugs => deleteBug(prevBugs));
        break;
      default:
        console.log('Error deleting bug, unknown source');
        break;
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
        console.log('Error placing bug, unknown destination');
        break;
    }

  } 

  function handleOnDragEnd(result) {
    //console.log(result);
    if(!result.destination) return;
    transferBug(result.source.droppableId, result.source.index, result.destination.droppableId, result.destination.index);
  }

  const columnBreackpoints = {
    default: 4,
    1200: 3,
    900: 2,
    600: 1
  };

  return (
    <Container maxWidth="xl" sx={{mt: '2ch', overflow: 'hidden', pb: '10ch'}}>
      
      <Stack
        direction="row"
      >
        <Typography variant="h5" >{projectName}</Typography>
      </Stack>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Masonry
          breakpointCols={columnBreackpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">
          <TrackerColumn 
            type="open" 
            title="Abierto" 
            bgcolor={palette.bugcolumn.main} 
            accent={palette.state.open}
            bugs={openBugs}
            handleBugMove={handleBugMove}
            handleBugDelete={handleBugDelete}/>
          <TrackerColumn 
            type="onprogress" 
            title="En progreso" 
            bgcolor={palette.bugcolumn.main} 
            accent={palette.state.inprogress}
            bugs={onProgressBugs}
            handleBugMove={handleBugMove}
            handleBugDelete={handleBugDelete}/>
          <TrackerColumn 
            type="tobetested" 
            title="Para ser probado" 
            bgcolor={palette.bugcolumn.main} 
            accent={palette.state.tobetested}
            bugs={toBeTestedBugs}
            handleBugMove={handleBugMove}
            handleBugDelete={handleBugDelete}/>
          <TrackerColumn 
            type="onhold" 
            title="En espera" 
            bgcolor={palette.bugcolumn.main} 
            accent={palette.state.onhold}
            bugs={onHoldBugs}
            handleBugMove={handleBugMove}
            handleBugDelete={handleBugDelete}/>
        </Masonry>
      </DragDropContext>
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