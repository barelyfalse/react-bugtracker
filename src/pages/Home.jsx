import React from 'react'
import { Box, Typography } from '@mui/material';

function Home() {
  return (
    <Box sx={{display: 'flex', justifyContent: 'center'}}>
      <Box sx={{mt: '5ch'}}>
        <Typography variant="h4" sx={{textAlign: 'center'}}>
          Welcome to an amazing bug tracker
        </Typography>
      </Box>
    </Box>
  )
}

export default Home