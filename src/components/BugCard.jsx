import React from 'react'
import PropTypes from 'prop-types';
import {
  useTheme, 
  Box,
  Paper,
  Stack,
  Chip,
  Button,
  BaseButton,
  ButtonIcon,
  Typography
} from '@mui/material';

function BugCard({bug}) {
  const sevColors = useTheme().palette.severity;
  let severityColor;
  switch (bug.severity) {
    case 0: severityColor = sevColors.critical; break;
    case 1: severityColor = sevColors.normal; break;
    case 2: severityColor = sevColors.trivial; break;
    case 3: severityColor = sevColors.upgrade; break;
  }

  return (
    <Box>
      <Paper
        sx={{
          borderRadius: '1.5ch',
          p: '.5ch',
          boxShadow: '0',
          boxShadow: '0ch .5ch 1ch .2ch' + severityColor + '25'
        }}
      >
        <Stack direction="row">
          <Box 
            sx={{ 
              backgroundColor: severityColor, 
              width: '6px', 
              height: '6ch',
              borderRadius: '1ch',
              m: '.5ch'
            }}
          />
          <Box>
            <Typography >Hello</Typography>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}

BugCard.propTypes = {
  bug: PropTypes.object.isRequired,
}

export default BugCard