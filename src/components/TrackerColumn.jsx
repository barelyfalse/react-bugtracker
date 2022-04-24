import React, { createRef } from 'react'
import PropTypes from 'prop-types';
import {
  useMediaQuery,
  useTheme, 
  Box,
  Paper,
  Stack,
  Chip,
  Button,
  BaseButton,
  ButtonIcon,
  Grid,
  Typography,
  Grow
} from '@mui/material';
import BugCard from '../components/BugCard';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../css/bugcard.css';

function TrackerColumn({type, title, bgcolor, accent, bugs, handleBugMove}) {
  const darkmode = useTheme().palette.mode === 'dark';
  const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));
  
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={2}
        sx={{ 
          mt: '1ch',
          width: mobile ? '100%' : '100%', 
          height: '100%',
          minHeight: '10ch',
          borderRadius: '1.5ch',
          borderTopRightRadius: '1ch',
          borderTopLeftRadius: '1ch',
          boxShadow: 'inset 0px 5px ' + accent + ', 0ch 1ch 3ch .2ch' + accent + (darkmode ? '15':'40' ),
          backgroundColor: bgcolor,
        }}
      >
        <Box
          sx={{
            p: '1ch',
          }}
        >
          <Stack sx={{mb: '2ch'}}>
            <Typography variant="h6">{title}</Typography>
          </Stack>
          <TransitionGroup
            style={{display: 'flex', flexDirection: 'column', gap: '10px'}}
          >
            { 
              bugs ?
              bugs.map((bug, index) => {
                const nodeRef = createRef(null);
                return (
                  <CSSTransition
                    key={bug.id}
                    appear={true}
                    timeout={500} 
                    classNames="fade"
                    nodeRef={nodeRef}
                  >
                    <Box ref={nodeRef}>
                      <BugCard
                        key={index} 
                        bug={bug} 
                        type={type} 
                        handleBugMove={handleBugMove}/>
                    </Box>
                  </CSSTransition>
                )
              }) : <></>
            }
          </TransitionGroup>
        </Box>
      </Paper>
    </Grid>
  )
}

TrackerColumn.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bgcolor: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  handleBugMove: PropTypes.func.isRequired,
}

export default TrackerColumn