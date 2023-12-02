import React from "react";
import { DataGrid, GridColDef, GridRowId } from "@mui/x-data-grid";

interface TableProps {
  columns: GridColDef[];
  data: any[]; 
  renderActions?: (rowData: any) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, renderActions }) => {
  const columnsWithButtons: GridColDef[] = [
    ...columns,
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className="flex gap-4">{renderActions && renderActions(params.row)}</div>
      ),
    },
  ];

  return (
    <div style={{ width: '100%', minWidth: '600px' }}>
      <DataGrid
        rows={data}
        columns={columnsWithButtons}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />
    </div>
  );
};

export default Table;
