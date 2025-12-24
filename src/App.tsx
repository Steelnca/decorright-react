
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'

import { Layout } from './components/layout/Layout'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>

            <Route path='/' element={<Home/>} />
            <Route path='/about' element={<About/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/services' element={<Services/>} />

            <Route path='/login' element={<Login/>} />
            <Route path='/signup' element={<Signup/>} />

          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
