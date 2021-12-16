import * as React from 'react';
import { useEffect } from 'react';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import ToggleButton from '@mui/material/ToggleButton';
import { toggleWorkingTime, getWorkingState } from '../services/WorkingTimeService'
import { Typography } from '@material-ui/core';

const ActiveToggler = ({state, setState}) => {

  const getActiveIcon = () => (
    <div>
      <PersonIcon style={{ width: 200, height: 200, fill: "green" }} />
      <Typography style={{color:"green"}}>working</Typography>
    </div>
  )

  const getInactiveIcon = () => (
    <div>
      <PersonOffIcon style={{ width: 200, height: 200, fill: "red" }} />
      <Typography style={{color:"red"}}>in pause</Typography>
    </div>
  )

  const toggle = () => {
    toggleWorkingTime().then(resp => {
      setState(resp.data);
    })
  }

  const updateState = () => {
    getWorkingState().then(
      resp => setState(resp.data)
    );
  }

  const isSelected = stateToCheck => stateToCheck === 'on'

  useEffect(() => {
    updateState();
  })

  return (
    <ToggleButton
      value="check"
      selected={isSelected(state)}
      onChange={toggle}
      size="large"
      
    >
      {isSelected(state) ? getActiveIcon() : getInactiveIcon() }
    </ToggleButton>
  );
}

export default ActiveToggler;

