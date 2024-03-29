import React from 'react'
import PropTypes from 'prop-types';
import {
  useMediaQuery,
  useTheme, 
  Box,
  Paper,
  Stack,
  Grid,
  Typography,
} from '@mui/material';
import BugCard from '../components/BugCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { motion } from "framer-motion";

function TrackerColumn({type, title, bgcolor, accent, bugs, handleBugMove, handleBugDelete, handleBugOpenEdit}) {
  const darkmode = useTheme().palette.mode === 'dark';
  const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper
        elevation={2}
        sx={{ 
          mt: '1ch',
          width: mobile ? '100%' : '100%', 
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
          <Droppable droppableId={type}>
            {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    bugs ?
                    bugs.map((bug, index) => {
                      return (
                        <Draggable
                          key={bug.id}
                          draggableId={bug.id}
                          index={index}>
                          {(provided) => (
                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                              <motion.div
                                key={bug.id}
                                initial={{
                                  filter: darkmode ? 'brightness(2)' : 'brightness(0.8)',
                                  transform: 'scaleX(1.05)',
                                }}
                                animate={{ 
                                  opacity: 1,
                                  filter: 'brightness(1)',
                                  transform: 'scaleX(1) scaleY(1)',
                                  transition: { ease: "easeOut", duration: .5}
                                }}
                                exit={{opacity: 0}}
                                whileTap={{ 
                                  filter: 'blur(1px)',
                                  opacity: 0.9,
                                  transform: 'scaleX(1.05) scaleY(1)',
                                  transition: { ease: "easeOut", duration: .5, delay: 0.1}}}>
                                <BugCard
                                  bug={bug} 
                                  type={type}
                                  handleBugMove={handleBugMove}
                                  handleBugDelete={handleBugDelete} 
                                  handleBugOpenEdit={handleBugOpenEdit} />
                              </motion.div>
                            </div>
                          )}
                        </Draggable>
                      )
                    }) : <></> 
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
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
  handleBugDelete: PropTypes.func.isRequired,
}

export default TrackerColumn