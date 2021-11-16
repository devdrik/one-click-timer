import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { getDuration } from '../services/WorkingTimeService';
import { Box, Chip } from '@material-ui/core';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import { TextField } from '@mui/material';
import moment from 'moment';
import { datePickerformat } from '../config/config'

const WorkingTime = () => {
  
  const formatDuration = duration => {
    return moment.utc(moment.duration(duration).as('milliseconds')).format('HH:mm:ss')
  }

  const [workingTime, setWorkingTime] = useState(formatDuration("PT0"));
  const [date, setDate] = useState(new Date());

  const updateDate = useCallback( newDate => {
    setDate(newDate);
    getDuration(newDate.toISOString())
      .then(resp => setWorkingTime(formatDuration(resp.data)));
  }, [])

  useEffect(() => {
    updateDate(new Date())
  }, [updateDate])

  return (
    <>
    <Box display="inline-flex" flexDirection="column" >
      <Box sx={{display: "inline-flex", p: "10px"}}>
        <MobileDatePicker
            label="choose date"
            inputFormat={datePickerformat}
            disableFuture
            value={date}
            onChange={updateDate}
            renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Box sx={{display: "inline-flex", p: "5px 0 10px 10px"}}>
        <Chip label={"time worked: " + workingTime} />
      </Box>
    </Box>
    </>
  );
}

export default WorkingTime;

