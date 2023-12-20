import { useState } from 'react'
import { GridColDef, DataGrid } from '@mui/x-data-grid'
import { User } from 'common/types'
import TableActions from './TableActions'
import useGetUsers from '../hooks/useGetUsers'

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 300 },
  { field: 'email', headerName: 'Email', flex: 1, minWidth: 300 },
  { field: 'age', headerName: 'Age', width: 130 },
]

function UsersTable() {
  const { data: users = [], isRefetching } = useGetUsers()
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])

  return (
    <>
      <TableActions selectedUsers={selectedUsers} />
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        loading={isRefetching}
        onRowSelectionModelChange={(ids) =>
          setSelectedUsers(users.filter((row) => ids.includes(row.id)))
        }
        autoHeight={true}
      />
    </>
  )
}

export default UsersTable
