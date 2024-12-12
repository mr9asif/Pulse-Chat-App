import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './Routes/router'
import AuthContext from './Utils/AuthContext'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
    <RouterProvider router={router}>
      <Toaster/> 
    </RouterProvider>
    </AuthContext>
  </StrictMode>,
)
