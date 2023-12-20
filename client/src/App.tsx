import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SnackbarProvider } from 'notistack'
import Home from './pages/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <SnackbarProvider />
      <Home />
    </QueryClientProvider>
  )
}

export default App
