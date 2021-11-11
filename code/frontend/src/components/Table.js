import { DataGrid } from '@mui/x-data-grid';
import { getAllWorkingTimes, updateWorkingTime } from '../services/WorkingTimeService'
import { useState, useEffect } from 'react';

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

const columns = [
  {
    field: 'ON',
    headerName: 'From',
    minWidth: 250,
    flex: 1,
    editable: true,
    valueGetter: params => params.value.createdDate,
    valueFormatter: params => new Date(params.row.ON.createdDate).toLocaleString('en-EN', dateOptions)
  },
  {
    field: 'OFF',
    headerName: 'To',
    minWidth: 250,
    flex: 1,
    editable: true,
    valueGetter: params => params.value.createdDate,
    valueFormatter: params => new Date(params.row.OFF.createdDate).toLocaleString('en-EN', dateOptions)
  },
  {
    field: 'duration',
    headerName: 'time',
    minWidth: 200,
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
    if(data[data.length-1] === 'ON') {
      entry.id = rowId;
      entry.duration = new Date() - new Date(entry.ON)
      preparedData.push(entry);
    }
    console.log(`preparedData`, preparedData)
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
