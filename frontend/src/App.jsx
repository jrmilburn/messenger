import { useContext, useState } from 'react'
import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Router } from 'react-router-dom'
import PrivateRoute from './context/PrivateRoute';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ChatPage from './pages/ChatPage';
import ProfilePage from './pages/ProfilePage';

import { AuthProvider } from './context/AuthContext';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />} >
        
              <Route path='/dashboard' element={<ChatPage />} />
              <Route path='/profile' element={<ProfilePage />} />
          
        </Route>

      </>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
