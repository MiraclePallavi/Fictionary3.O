import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './pages/context/UserContext.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_API_CLIENTID}>
    <UserProvider>
    <App />
    </UserProvider>
    </GoogleOAuthProvider>
    
  </StrictMode>,
)
