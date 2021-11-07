import * as React from 'react';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonIcon from '@mui/icons-material/Person';
import ToggleButton from '@mui/material/ToggleButton';

const WorkToggler = () => {
  const [selected, setSelected] = React.useState(false);

  return (
    <ToggleButton
      value="check"
      selected={selected}
      onChange={() => {
        setSelected(!selected);
      }}
    >
      {selected ? <PersonIcon /> : <PersonOffIcon />}
    </ToggleButton>
  );
}

export default WorkToggler;
