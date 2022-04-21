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
import TrackerColumn from '../components/TrackerColumn'
import BugTrackerDial from '../components/BugtrackerDial';


function Bugtrack() {
  const curProj = getCurrentProject();
  const [projectName, setProjectName] = useStoragedProject(curProj, 'name', '');

  const palette = useTheme().palette;
  const onMobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <Container maxWidth="xl" sx={{mt: '2ch'}}>
      
      <Stack
        direction="row"
      >
        <Typography variant="h5" >{projectName}</Typography>
      </Stack>
      <Grid container spacing={{xl: 4, sm: 2, xs: 1}} rowSpacing={4}>
        <TrackerColumn type="open" bgcolor={palette.bugcolumn.main + '07'} accent={palette.state.open}/>
        <TrackerColumn type="in progress" bgcolor={palette.bugcolumn.main + '07'} accent={palette.state.inprogress}/>
        <TrackerColumn type="to be tested" bgcolor={palette.bugcolumn.main + '07'} accent={palette.state.tobetested}/>
        <TrackerColumn type="on hold" bgcolor={palette.bugcolumn.main + '07'} accent={palette.state.onhold}/>
      </Grid>
      <BugTrackerDial onMobile={onMobile} />
    </Container>
    
  )
}

export default Bugtrack