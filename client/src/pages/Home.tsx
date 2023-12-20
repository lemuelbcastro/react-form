import { Container } from '@mui/material'
import UsersTable from '../features/users/components/UsersTable'

function Home() {
  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{ my: { xs: 2, md: 3 }, p: { xs: 2, md: 3 } }}
    >
      <UsersTable />
    </Container>
  )
}

export default Home
