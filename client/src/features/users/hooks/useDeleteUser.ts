import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: number) => axios.delete(`/api/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}

export default useDeleteUser
