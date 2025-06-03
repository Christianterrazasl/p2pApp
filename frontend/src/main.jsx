import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './hooks/AuthContext'
import NotAuthPage from './pages/NotAuthPage'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/not-auth" element={<NotAuthPage/>} />
          <Route path="/" element={<HomePage/>} />
          <Route path="/register-page" element={<RegisterPage/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)
