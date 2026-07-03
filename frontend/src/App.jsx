import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import VerificarCodigo from './pages/VerificarCodigo';
import RecuperarPassword from './pages/RecuperarPassword';
import NuevaContrasena from './pages/NuevaContraseña';
import Dashboard from './pages/Dashboard';
import MacetasPage from './pages/Macetas';
import VelasPage from './pages/Velas';
import AjustesPage from './pages/Ajustes';
import InventarioPage from './pages/Inventario';
import Registro from './pages/Registro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route path="/verificar" element={<VerificarCodigo />} />
        <Route path="/nueva-contrasena" element={<NuevaContrasena />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/macetas" element={<MacetasPage />} />
        <Route path="/velas" element={<VelasPage />} />
        <Route path="/ajustes" element={<AjustesPage/>} />
        <Route path="/inventario" element={<InventarioPage/>} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;