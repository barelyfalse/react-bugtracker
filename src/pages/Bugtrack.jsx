import React from 'react';
import {
  useTheme, 
  Container,
  Typography,
  Stack,
} from '@mui/material';
import { useStoragedProject, getCurrentProject } from '../useLocalStorage';
function Bugtrack() {
  const palette = useTheme().palette;
  const curProj = getCurrentProject();
  const [projectName, setProjectName] = useStoragedProject(curProj, 'name', '')
  return (
    <Container sx={{mt: '2ch'}}>
      
      <Stack
        direction="row"
      >
        <Typography variant="h5" >{projectName}</Typography>
      </Stack>
    </Container>
  )
}

export default Bugtrack