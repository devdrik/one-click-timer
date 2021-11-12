import * as React from 'react';
import { useState, useEffect } from 'react';
import { getDuration } from '../services/WorkingTimeService';
import { locale } from '../config/config'

const WorkingTime = () => {
  const [workingTime, setWorkingTime] = useState("");
  const date=new Date().toLocaleDateString(locale);

  useEffect(() => {
    getDuration(new Date().toISOString()).then(resp => setWorkingTime(resp.data));
  }, [setWorkingTime])

  return (
    <div>
      On {date} you worked {workingTime}
    </div>
  );
}

export default WorkingTime;
