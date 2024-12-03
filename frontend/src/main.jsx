import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import router from './Routes/router'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router}>
     
     </RouterProvider>
  </StrictMode>,
)