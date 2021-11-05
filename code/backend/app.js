import express from 'express';
 
const app = express();
const port = process.env.PORT || 8085;

const STATE = {
  on: 'on',
  off: 'off'
}
let state = STATE.off;
const timeList = [];
 
app.get('/toggle', (req, res) => {
  handleToggleRequest();
  res.send(state)
});
 
app.get('/ontime', (req, res) => {
  const time = getOnTime();
  const timeString = getTimeStringFromMs(time);
  res.send(timeString);
});

const handleToggleRequest = () => {
  state = state == STATE.on ? STATE.off : STATE.on;
  const entry = {
    time: new Date(),
    state
  }
  timeList.push(entry)
  console.log(entry)
}

const getOnTime = () => {
  let passedTimeInMs = 0;
  for(let i=0; i < timeList.length -1; i=i+2) {
    passedTimeInMs += timeList[i+1].time - timeList[i].time;
  } 
  if(state == STATE.on) {
    passedTimeInMs += new Date() - timeList[timeList.length - 1].time;
  }
  return passedTimeInMs;
}

const getTimeStringFromMs = timeInMs => {
  var ms = timeInMs % 1000;
  timeInMs = (timeInMs - ms) / 1000;
  var secs = timeInMs % 60;
  timeInMs = (timeInMs - secs) / 60;
  var mins = timeInMs % 60;
  var hrs = (timeInMs - mins) / 60;

  return hrs + ':' + mins + ':' + secs + '.' + ms;
}

app.listen(port, () =>
  console.log(`OneClickTimer backend up on port ${port}!`),
);