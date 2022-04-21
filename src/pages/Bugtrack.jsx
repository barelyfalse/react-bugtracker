import React from 'react';
import { 
  Container,
  Typography,
} from '@mui/material';
import { useStoragedProject, getCurrentProject } from '../useLocalStorage';
function Bugtrack() {
  const curProj = getCurrentProject();
  const [projectName, setProjectName] = useStoragedProject(curProj, 'name', '')
  return (
    <Container sx={{mt: '2ch'}}>
      <Typography variant="h4">{projectName}</Typography>
    </Container>
  )
}

export default Bugtrack