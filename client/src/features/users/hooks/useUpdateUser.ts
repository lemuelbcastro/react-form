import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'common/types'

const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (updatedUser: User) =>
      axios.put(`/api/users/${updatedUser.id}`, updatedUser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}

export default useUpdateUser
