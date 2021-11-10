import { DataGrid } from '@mui/x-data-grid';
import { getAllWorkingTimes } from '../services/WorkingTimeService'
import { useState, useEffect } from 'react';

const columns = [
  { 
    field: 'id', 
    headerName: 'ID', 
    width: 90 
  },
  {
    field: 'date',
    headerName: 'Date',
    width: 200,
    editable: true,
    valueGetter: (params) => new Date(params.getValue(params.id, 'createdDate')).toLocaleDateString()
  },
  {
    field: 'time',
    headerName: 'Time',
    width: 200,
    editable: true,
    valueGetter: (params) => new Date(params.getValue(params.id, 'createdDate')).toLocaleTimeString()
    },
  {
    field: 'state',
    headerName: 'state',
    width: 150,
    editable: false,
  },
];


const Table = () => {

  const [workingTimes, setWorkingTimes] = useState([]);

  useEffect(() => {
    getAllWorkingTimes().then(resp => {
      setWorkingTimes(resp.data)
    })
  }, [setWorkingTimes])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={workingTimes}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[10]}
        checkboxSelection={false}
        disableSelectionOnClick

      />
    </div>
  );
}

export default Table;
