import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './hooks/AuthContext'
import NotAuthPage from './pages/NotAuthPage'
import HomePage from './pages/HomePage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/not-auth" element={<NotAuthPage/>} />
          <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
)
