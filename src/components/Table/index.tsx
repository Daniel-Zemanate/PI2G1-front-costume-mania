import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function Table({ columns, data }: { columns: GridColDef[], data: Object[] }) {
    return <div style={{ width: '100%', minWidth: '600px' }}>
        <DataGrid
            rows={data}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
            pageSizeOptions={[5, 10]}
        />
    </div>
}

export default Table;
