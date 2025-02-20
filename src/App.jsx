import { Route, Routes } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/authPages/Login';

function App() {
  const user = false;
  return (
    <>
      <Routes>
        <Route path='/' element={user ? <Home /> : <Login />} />
        <Route path='/dashboard' element={user ? <Dashboard /> : <Login />} />
      </Routes>
    </>
  )
}

export default App