import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Suggests from './components/pages/Suggests'
import AddSuggests from './components/pages/AddSuggests'
import OnlySuggest from './components/pages/OnlySuggest'

import {UserProvider} from './context/UserContext'

import Navbar from './components/Navbar'

import Message from './components/layout/Message'

function App() {
  return (
    <Router>
      <UserProvider>
      <Navbar />
      <Message/>
      <Routes>
        <Route path="/Register" element={<Register />} />
        <Route path="/Suggests" element={<Suggests />} />
        <Route path="/AddSuggests" element={<AddSuggests />} />
        <Route path="/OnlySuggest/:id" element={<OnlySuggest />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/" element={<Login />} />
      
      </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
