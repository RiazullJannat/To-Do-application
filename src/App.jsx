import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/authPages/Login';

import Register from './pages/authPages/Register';
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();
  if (loading) {
    return <p>loading.....</p>
  }
  return (
    <>
      <Routes>
        <Route path='/' element={user ? <Navigate to={'/dashboard'} /> : <Login />} />
        <Route path='/dashboard' element={user ? <Dashboard /> : <Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App;