import React from 'react'
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { getProjectData, setCurrentProject } from '../useLocalStorage'
import {
  Paper,
  ButtonBase,
} from '@mui/material';

function BugProjectCard({id}) {
  const project = getProjectData(id);

  const onOpenProject = () => {
    setCurrentProject(id);
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
      component={Link}
      to="bugtrack"
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