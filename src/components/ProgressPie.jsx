import React from 'react'

import {Stack} from '@mui/material';
import '../css/progressPie.css';

function ProgressPie({color, progress}) {
  const pieWrapperStyle = {
    width: '2ch',
    height: '2ch',
    marginBottom: '0.5ch',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: '50%'
  };

  const pieStyle = {
    strokeWidth: 8,
    stroke: color,
    fill: 'none',
  };

  const percentageTextStyle = {
    fontSize: '1.5ch',
    opacity: 0.5,
    marginLeft: '0.5ch',
  }

  return (
    <Stack direction="row">
      <div style={pieWrapperStyle}>
        <svg viewBox="0 0 20 20">
          <path style={pieStyle}
            stroke-dasharray={(25 * progress)+', 100'}
            d="M10 6
              a 2 2 0 0 1 0 8
              a 2 2 0 0 1 0 -8"
          />
        </svg>
      </div>
      <span style={percentageTextStyle}>{(Math.floor((progress * 100) * 10) / 10)}%</span>
    </Stack>
  )
}

export default ProgressPie