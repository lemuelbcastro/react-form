import { useState } from 'react'
import { Box, Fab } from '@mui/material'
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material'
import { enqueueSnackbar } from 'notistack'
import { User } from 'common/types'
import UserFormDialog, { UserFormData } from './UserFormDialog'
import useAddUser from '../hooks/useAddUser'
import useUpdateUser from '../hooks/useUpdateUser'
import useDeleteUser from '../hooks/useDeleteUser'

function TableActions({ selectedUsers }: { selectedUsers: User[] }) {
  const addUser = useAddUser()
  const updateUser = useUpdateUser()
  const deleteUser = useDeleteUser()
  const [isAddFormOpen, setIsAddFormOpen] = useState(false)
  const [isEditFormOpen, setIsEditFormOpen] = useState(false)
  const [selectedUser] = selectedUsers

  const handleAddUser = (data: UserFormData) =>
    addUser.mutate(data, {
      onSuccess: () => {
        setIsAddFormOpen(false)
        enqueueSnackbar('User created', { variant: 'success' })
      },
      onError: () => {
        enqueueSnackbar('Error creating user', { variant: 'error' })
      },
    })

  const handleUpdateUser = (data: UserFormData) =>
    updateUser.mutate(
      { ...data, id: selectedUser.id },
      {
        onSuccess: () => {
          setIsEditFormOpen(false)
          enqueueSnackbar('User updated', { variant: 'success' })
        },
        onError: () => {
          enqueueSnackbar('Error updating user', { variant: 'error' })
        },
      },
    )

  const handleDeleteUser = async () => {
    if (selectedUsers.length) {
      try {
        const deletionPromises = selectedUsers.map(({ id }) =>
          deleteUser.mutateAsync(id),
        )

        await Promise.all(deletionPromises)

        enqueueSnackbar('User(s) deleted', { variant: 'success' })
      } catch (taskError) {
        enqueueSnackbar('Error deleting user(s)', { variant: 'error' })
      }
    }
  }

  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& > :not(style)': { m: 1 },
          my: 1,
        }}
      >
        <Fab
          color="primary"
          size="small"
          aria-label="add"
          onClick={() => setIsAddFormOpen(true)}
        >
          <AddIcon />
        </Fab>
        <Fab
          color="primary"
          size="small"
          aria-label="edit"
          onClick={() => setIsEditFormOpen(true)}
          disabled={!selectedUsers.length || selectedUsers.length > 1}
        >
          <EditIcon />
        </Fab>
        <Fab
          color="secondary"
          size="small"
          aria-label="delete"
          onClick={handleDeleteUser}
          disabled={!selectedUsers.length}
        >
          <DeleteIcon />
        </Fab>
      </Box>
      {isAddFormOpen && (
        <UserFormDialog
          title="Add User"
          loading={addUser.isPending}
          open={isAddFormOpen}
          handleClose={() => setIsAddFormOpen(false)}
          handleSubmit={handleAddUser}
        />
      )}
      {isEditFormOpen && !!selectedUser && (
        <UserFormDialog
          title="Edit User"
          defaultValues={selectedUser}
          loading={updateUser.isPending}
          open={isEditFormOpen}
          handleClose={() => setIsEditFormOpen(false)}
          handleSubmit={handleUpdateUser}
        />
      )}
    </>
  )
}

export default TableActions
