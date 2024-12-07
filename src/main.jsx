import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='875632801312-50cph0g1tsqp90qfajgcqnltqt6ioo5d.apps.googleusercontent.com'>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
