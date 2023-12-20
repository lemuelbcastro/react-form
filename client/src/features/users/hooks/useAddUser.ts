import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User } from 'common/types'

const useAddUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newUser: Omit<User, 'id'>) =>
      axios.post(`/api/users`, newUser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      })
    },
  })
}

export default useAddUser
