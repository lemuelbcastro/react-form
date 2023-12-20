import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User } from 'common/types'
import { userSchema } from 'common/schemas'
import React from 'react'

export type UserFormData = Omit<User, 'id'>

export interface UserFormDialogProps {
  title: React.ReactNode
  defaultValues?: UserFormData
  loading?: boolean
  open: boolean
  handleClose: () => void
  handleSubmit: SubmitHandler<UserFormData>
}

function UserFormDialog({
  title,
  defaultValues,
  loading = false,
  open,
  handleClose,
  handleSubmit: onSubmit,
}: UserFormDialogProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormData>({
    defaultValues: defaultValues ?? {
      name: '',
      email: '',
      age: undefined,
      phone: '',
    },
    resolver: zodResolver(userSchema.omit({ id: true })),
  })

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                autoFocus
                margin="dense"
                label="Name"
                type="text"
                variant="standard"
                fullWidth
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                disabled={loading}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Email"
                type="email"
                variant="standard"
                fullWidth
                error={!!errors.email?.message}
                helperText={errors.email?.message}
                disabled={loading}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value || ''}
                margin="dense"
                label="Age"
                type="number"
                variant="standard"
                fullWidth
                error={!!errors.age?.message}
                helperText={errors.age?.message}
                disabled={loading}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Phone"
                type="text"
                variant="standard"
                fullWidth
                error={!!errors.phone?.message}
                helperText={errors.phone?.message}
                disabled={loading}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <LoadingButton type="submit" loading={loading}>
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default UserFormDialog
