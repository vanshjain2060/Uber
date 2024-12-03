import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { UserDataContextProvider } from './context/UserContext.jsx';
import { CaptainDataContextProvider } from './context/CaptainContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserDataContextProvider>
      <CaptainDataContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CaptainDataContextProvider>
    </UserDataContextProvider>
  </StrictMode>
);