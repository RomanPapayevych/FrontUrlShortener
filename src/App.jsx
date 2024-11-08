import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login'
import Register from './components/register'
import Profile from './components/profile'
import UrlTable from './components/urlTable';
import RedirectPage from './components/redirectPage';
import About from './components/about'
import Info from './components/info'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Navigate to ="/urlTable"/>}/>  
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/urlTable' element={<UrlTable/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/info/:id' element={<Info/>}/>
          <Route path="/:shortUrl" element={<RedirectPage />} />
          <Route path='*' element={<div>NotFound</div>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
