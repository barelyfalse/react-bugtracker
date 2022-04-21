import React from 'react'
import PropTypes from 'prop-types';
import { useNavigate  } from "react-router-dom";
import { useLocalStorage, getProjectData } from '../useLocalStorage'
import { 
  Box, 
  Typography,
  Container,
  Paper,
  ButtonBase,
} from '@mui/material';

function BugProjectCard({id}) {
  const nav = useNavigate();
  const project = getProjectData(id);
  const [currentProject, setCurrentProject] = useLocalStorage('currentproject', '')

  if(!project) {
    console.log('Project "' + id + '" not found')
    return <></>
  }

  const onOpenProject = () => {
    setCurrentProject(id);
    nav('bugtrack');
  }

  return (
    <ButtonBase 
      sx={{
        width: '250px',
        height: '250px',
        borderRadius: '2ch',
        boxShadow: '0ch 1ch 1ch 1ch rgba(0, 0, 0, 0.3)'
      }}
      onClick={onOpenProject}
    >
      <Paper 
        elevation={2}
        sx={{
          width: '1',
          height: '1',
          p: '2ch',
          borderRadius: '2ch',
          boxShadow: '0'
        }}
      >
        {project.name}
      </Paper>
    </ButtonBase>
  )
}

BugProjectCard.propTypes = {
  id: PropTypes.string
};

export default BugProjectCard