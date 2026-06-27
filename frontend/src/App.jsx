import React, { useState } from 'react';
import Login from './pages/login';
import VerificarCodigo from './pages/VerificarCodigo';
import RecuperarPassword from './pages/RecuperarPassword';
import NuevaContrasena from './pages/NuevaContraseña';
import Dashboard from './pages/Dashboard';
import MacetasPage from './pages/Macetas';
import VelasPage from './pages/Velas';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [userEmail, setUserEmail] = useState('');

  const handleLoginSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('login');
  };

  const handleForgotPassword = () => {
    setCurrentPage('recuperar');
  };

  const handleSendCode = (email) => {
    setUserEmail(email);
    setCurrentPage('verificar');
  };

  const handleVerifySuccess = () => {
    setCurrentPage('nueva-contrasena');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleDashboardNavigation = (page) => {
    if (page === 'logout') {
      handleLogout();
    } else {
      setCurrentPage(page);
    }
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onForgotPassword={handleForgotPassword}
        />
      )}
      
      {currentPage === 'recuperar' && (
        <RecuperarPassword 
          onBackToLogin={handleBackToLogin} 
          onSendCode={handleSendCode}
        />
      )}
      
      {currentPage === 'verificar' && (
        <VerificarCodigo 
          onBackToLogin={handleBackToLogin}
          onVerifySuccess={handleVerifySuccess}
        />
      )}
      
      {currentPage === 'nueva-contrasena' && (
        <NuevaContrasena 
          onBackToLogin={handleBackToLogin}
        />
      )}
      
      {currentPage === 'dashboard' && (
        <Dashboard 
          onLogout={handleLogout}
          onNavigate={handleDashboardNavigation}
        />
      )}

      {currentPage === 'macetas' && (
        <MacetasPage 
          onNavigate={handleDashboardNavigation}
        />
      )}

      {currentPage === 'velas' && (
        <VelasPage 
          onNavigate={handleDashboardNavigation}
        />
      )}
    </div>
  );
}

export default App;