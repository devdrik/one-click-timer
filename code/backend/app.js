import express from 'express';
 
const app = express();
const port = process.env.PORT || 8085;

let state = 'off';
const timeList = [];
 
app.get('/toggle', (req, res) => {
  handleToggleRequest();
  res.send(state)
});

app.listen(port, () =>
  console.log(`OneClickTimer backend up on port ${port}!`),
);

const handleToggleRequest = () => {
  state = state == 'on' ? 'off' : 'on';
  const entry = {
    time: new Date(),
    state
  }
  timeList.push(entry)
  console.log(entry)
}

