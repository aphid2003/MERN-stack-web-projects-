import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import Signup from './Signup.jsx'
import Login from './Login.jsx'
import NewsFeed from './NewsFeed.jsx'

import{ BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/news" element={<NewsFeed />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App