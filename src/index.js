import React from 'react';
import App from './App';
import { AuthContextProvider} from "./context/AuthContext";
import { createRoot } from 'react-dom/client';



createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);


