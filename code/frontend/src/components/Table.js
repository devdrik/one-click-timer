import { DataGrid } from '@mui/x-data-grid';
import { getAllWorkingTimes, updateWorkingTime } from '../services/WorkingTimeService'
import { useState, useEffect } from 'react';

const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };

const columns = [
  {
    field: 'createdDate',
    headerName: 'Date',
    minWidth: 200,
    flex: 1,
    editable: true,
    valueFormatter: params => new Date(params.row.createdDate).toLocaleString('en-EN', dateOptions)
  },
  {
    field: 'state',
    headerName: 'state',
    minWidth: 100,
    flex: 0.2,
    editable: false,
  },
];


const Table = () => {

  const [workingTimes, setWorkingTimes] = useState([]);

  const updateWorkingTimes = params => {
    console.log(`params`, params)
    updateWorkingTime(workingTimes
        .filter(item => item.id === params.id)
        .map(item => ({...item, createdDate: params.value}))[0])
      .then(resp => {
        setWorkingTimes(workingTimes.map(item => item.id === params.id ? resp.data : item))
        console.log(`resp`, resp)
      })
  }

  const handleCellEdit = (params, event) => {
    console.log(`params`, params)
    switch(params.field) {
      case 'createdDate':
        updateWorkingTimes(params)
        break;
      default:
    }
  }

  useEffect(() => {
    getAllWorkingTimes().then(resp => {
      setWorkingTimes(resp.data)
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
