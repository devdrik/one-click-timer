import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { getDuration } from '../services/WorkingTimeService';
import { Box, Chip, Typography } from '@material-ui/core';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';
import moment from 'moment';
import { datePickerformat } from '../config/config'
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const WorkingTime = ({selectedDate, setSelectedDate, state}) => {
  
  const formatDuration = duration => {
    return moment.utc(moment.duration(duration).as('milliseconds')).format('HH:mm:ss')
  }

  const [workingTime, setWorkingTime] = useState(formatDuration("PT0"));
  
  const updateDuration = useCallback((newDate) => {
    getDuration(newDate)
      .then(resp => setWorkingTime(formatDuration(resp.data)));
  }, [])

  const updateDate = useCallback( newDate => {
    setSelectedDate(newDate);
    updateDuration(newDate);
  }, [updateDuration, setSelectedDate])


  useEffect(() => {
    updateDate(new Date())
  }, [updateDate])

  useEffect(() => {
    const interval = setInterval(() => {
      if( state === 'on') {
        updateDuration(selectedDate)
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <>
    <Box display="inline-flex" flexDirection="column" >
      <Box sx={{display: "inline-flex", p: "10px"}}>
        <MobileDatePicker
            label="choose date"
            inputFormat={datePickerformat}
            disableFuture
            value={selectedDate}
            onChange={d => updateDate(new Date(d))}
            renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box sx={{display: "inline-flex", p: "5px 0 10px 10px"}}>
        <Chip icon={<HourglassEmptyIcon fontSize="large" />} label={
          <Typography style={{fontSize: "34px"}}>{workingTime}</Typography>
          } 
        />
      </Box>
    </Box>
    </>
  );
}

export default WorkingTime;

