import { DataGrid } from '@mui/x-data-grid';
import { getAllWorkingTimes, updateWorkingTime } from '../services/WorkingTimeService'
import { useState, useEffect } from 'react';

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
const locale = 'de-DE'
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
    valueFormatter: params => new Date(params.row.ON.createdDate).toLocaleTimeString()
  },
  {
    field: 'OFF',
    headerName: 'To',
    minWidth: 100,
    flex: 1,
    editable: true,
    valueGetter: params => params.value.createdDate,
    valueFormatter: params => new Date(params.row.OFF.createdDate).toLocaleTimeString()
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

const Table = () => {

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
    let id, date;
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
    date = params.value;
    updateWorkingTimes(id, date);
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
    if(data[data.length-1].state === 'ON') {
      entry.id = rowId;
      entry.OFF = {createdDate: new Date()};
      entry.duration = new Date() - new Date(entry.ON.createdDate)
      preparedData.push(entry);
    }
    return preparedData;
  }

  useEffect(() => {
    getAllWorkingTimes().then(resp => {
      rawWorkingTimes = resp.data;
      setWorkingTimes(getPreparedData(rawWorkingTimes))
    })
  }, [setWorkingTimes])

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
