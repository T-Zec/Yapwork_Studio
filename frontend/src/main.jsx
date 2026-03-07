import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from "./context/AuthContext";
import { WorkspaceProvider } from './context/WorkspaceContext.jsx';
import './index.css'
import { ChannelProvider } from './context/ChannelContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <WorkspaceProvider>
        <ChannelProvider>
          <App />
        </ChannelProvider>
      </WorkspaceProvider>
    </AuthProvider>
  </StrictMode>
);
