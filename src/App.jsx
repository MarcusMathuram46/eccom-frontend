import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import './styles/App.css'

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route path='/' element={<HomePage />} /> 
        </Routes>
      </div>
    </Router>
  )
}

export default App
