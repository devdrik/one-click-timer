import { DataGrid } from '@mui/x-data-grid';
import { getAllWorkingTimesByDate, updateWorkingTime } from '../services/WorkingTimeService'
import { useState, useEffect, useCallback } from 'react';
import { locale } from '../config/config'

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timezone: 'Europe/Berlin' };
const timeZoneOption = { timezone: 'Europe/Berlin' }

const getLocaleDateString = dateString => {
  let d = new Date(dateString)
  d = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000)
  return d.toLocaleTimeString(locale, timeZoneOption)
}

const offsetDate = date => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
}

const columns = [
  {
    field: 'date',
    headerName: 'Date',
    minWidth: 150,
    flex: 1.5,
    editable: false,
    valueGetter: params => params.row.ON.createdDate,
    valueFormatter: params => new Date(params.row.ON.createdDate).toLocaleDateString(locale, dateOptions)
  },
  {
    field: 'ON',
    headerName: 'From',
    minWidth: 120,
    flex: 1,
    editable: true,
    valueGetter: params => params.value.createdDate,
    valueFormatter: params => getLocaleDateString(params.row.ON.createdDate)
  },
  {
    field: 'OFF',
    headerName: 'To',
    minWidth: 100,
    flex: 1,
    editable: true,
    valueGetter: params => params.value.createdDate,
    valueFormatter: params => getLocaleDateString(params.row.OFF.createdDate)
  },
  {
    field: 'duration',
    headerName: 'time',
    minWidth: 150,
    flex: 1,
    editable: false,
    valueFormatter: params => new Date(params.getValue(params.id, 'duration')).toISOString().slice(11,-5)
  },
];

let rawWorkingTimes = []

const Table = ({selectedDate, state}) => {

  const [workingTimes, setWorkingTimes] = useState([]);

  const updateWorkingTimes = (id, newDate) => {
    updateWorkingTime(rawWorkingTimes
        .filter(item => item.id === id)
        .map(item => ({...item, createdDate: newDate}))[0])
      .then(resp => {
        setWorkingTimes(getPreparedData(rawWorkingTimes.map(item => item.id === id ? resp.data : item)))
      })
  }

  const handleCellEdit = (params, event) => {
    if (event.type === 'keydown') {
      event.preventDefault()
    }
    let id, selectedDate;
    switch (event.type) {
      case 'click':
        id = params.row[params.field].id;
        break;
      case 'keydown':
        id = params.field === 'ON' ? params.id * 2 -1 : params.id * 2;
        break;
      default:
        id = undefined;
    }
    selectedDate = params.value;
    updateWorkingTimes(id, selectedDate);
  }

  const getPreparedData = data => {
    const preparedData = [];
    let entry = {};
    let rowId = 1;
    data.forEach(item => {
      entry[item.state] = item;
      if(item.state === 'OFF') {
        entry.id = rowId;
        entry.duration = new Date(entry.OFF.createdDate) - new Date(entry.ON.createdDate)
        preparedData.push(entry);
        entry = {};
        rowId++;
      }
    })
    if(data[data.length-1] && data[data.length-1].state === 'ON') {
      entry.id = rowId;
      entry.OFF = {createdDate: offsetDate(new Date()) };
      entry.duration = new Date(entry.OFF.createdDate) - new Date(entry.ON.createdDate)
      preparedData.push(entry);
    }
    return preparedData;
  }

  const getData = useCallback(
    () => {
      getAllWorkingTimesByDate(selectedDate).then(resp => {
        rawWorkingTimes = resp.data;
        setWorkingTimes(getPreparedData(rawWorkingTimes))
      })
    }, [selectedDate])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const interval = setInterval(() => {
      if (state === 'on') {
        getData()
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div style={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={workingTimes}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick
        onCellEditCommit={handleCellEdit}
      />
    </div>
  );
}

export default Table;
