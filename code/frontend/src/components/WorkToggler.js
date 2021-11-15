import * as React from 'react';
import { useEffect } from 'react';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import ToggleButton from '@mui/material/ToggleButton';
import { toggleWorkingTime, getWorkingState } from '../services/WorkingTimeService'
import { Typography } from '@material-ui/core';

const WorkToggler = () => {
  const [selected, setSelected] = React.useState(false);

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
      let state;
      switch (resp.data) {
        case 'on':
          state = true;
          break;
        case 'off':
          state = false;
          break;
        default:
          alert('we got an error');
          state = selected;
      }
      setSelected(state);
    })
  }

  useEffect(() => {
    getWorkingState().then(
      resp => setSelected(resp.data === 'on')
    )
  }, [setSelected])

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={toggle}
      size="large"
      
    >
      {selected ? getActiveIcon() : getInactiveIcon() }
    </ToggleButton>
  );
}

export default WorkToggler;
