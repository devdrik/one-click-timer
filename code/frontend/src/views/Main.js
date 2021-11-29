import Talbe from '../components/Table'
import WorkingTime from '../components/WorkingTime'
import WorkToggler from '../components/WorkToggler'
import { useState } from 'react';

const Main = () => {

  const [date, setDate] = useState(new Date());
  const [state, setState] = useState(false)

  return (
    <>
      <WorkToggler state={state} setState={setState} />
      <WorkingTime selectedDate={date} setSelectedDate={setDate} state={state}/>
      <Talbe selectedDate={date} state={state} />
    </>
  );
}

export default Main;