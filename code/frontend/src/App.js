
import './App.css';
import Main from './views/Main'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';


function App() {
  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <Main />
    </LocalizationProvider>
  );
}

export default App;
