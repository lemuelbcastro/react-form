import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { User } from 'common/types'

const fetchUsers = (): Promise<User[]> =>
  axios.get('/api/users').then((response) => response.data)

const useGetUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
  })

export default useGetUsers
