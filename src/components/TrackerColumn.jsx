import React from 'react'
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
  Typography
} from '@mui/material';
import BugCard from '../components/BugCard';

function capitalize(str) {
  const low = str.toLowerCase();
  return str.charAt(0).toUpperCase() + low.slice(1);
}

function TrackerColumn({type, bgcolor, accent}) {
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
            <Typography variant="h6">{capitalize(type)}</Typography>
          </Stack>
          <Stack direction="column" spacing={2}>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  )
}

TrackerColumn.propTypes = {
  type: PropTypes.string.isRequired,
}

export default TrackerColumn