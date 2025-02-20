import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/authPages/Login';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './providers/AuthProvider';
import Register from './pages/authPages/Register';
import useAuth from './hooks/useAuth';

function App() {
  const queryClient = new QueryClient();
  const { user } = useAuth();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path='/' element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </>
  )
}

export default App;