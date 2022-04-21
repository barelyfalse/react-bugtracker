import React, { useState } from 'react'
import { 
  Box, 
  Typography,
  Container,
  Grid,
  ButtonBase,
  Paper
} from '@mui/material';
import { v4 as uuid } from 'uuid';
import BugProjectCard from '../components/BugProjectCard'
import NewProjectDialog from '../components/NewProjectDialog'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useLocalStorage, storeNewProject } from "../useLocalStorage";

function Home() {
  //project controllers
  const [projects, setProjects] = useLocalStorage('projects', []);
  
  //new project dialog controllers
  const [newProjDialogOpen, setNewProjDialogOpen] = useState(false);
  const handleNewProjectDialogClickOpen = () => {
    setNewProjDialogOpen(true);}
  const handleNewProjectDialogClose = (name) => {
    name = name.trim();
    if(name) {
      const projId = uuid();
      setProjects(prevProjects => {
        let newProjects = [...prevProjects];
        newProjects.push(projId);
        return newProjects;
      });
      storeNewProject(name, projId);
    }
    setNewProjDialogOpen(false);
  }


  return (
    <Container>
      <Box sx={{mt: '5ch'}}>
        <Typography variant="h4" sx={{textAlign: 'center'}}>
          Bugtracking
        </Typography>
      </Box>
      <Box sx={{mt: '5ch'}}>
        <Grid 
          container 
          spacing={6} 
          justifyContent="center"
          alignItems="center" 
        >
          {
            projects.map((id, index) => {
              return (
                <Grid item key={index} >
                  <BugProjectCard id={id} />
                </Grid>
              )
            })
          }
          <Grid item>
            <ButtonBase 
              sx={{
                width: '250px',
                height: '250px',
                
                borderRadius: '2ch',
                boxShadow: '0ch 1ch 1ch 1ch rgba(0, 0, 0, 0.3)'
              }}
              onClick={handleNewProjectDialogClickOpen}
            >
              <Paper 
                elevation={1}
                sx={{
                  width: '1',
                  height: '1',
                  p: '2ch',
                  borderRadius: '2ch',
                  boxShadow: '0'
                }}
              >
                <Box 
                  sx={{
                    height: '1', 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center'
                  }}
                >
                  <AddRoundedIcon fontSize="large"/>
                </Box>
              </Paper>
            </ButtonBase>
          </Grid>
        </Grid>
      </Box>
      <NewProjectDialog 
        open={newProjDialogOpen}
        onClose={handleNewProjectDialogClose}
      />
    </Container>
  )
}

export default Home