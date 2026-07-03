import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import VerificarCodigo from './pages/VerificarCodigo';
import RecuperarPassword from './pages/RecuperarPassword';
import Registro from './pages/Registro';
import NuevaContrasena from './pages/NuevaContraseña';
import Dashboard from './pages/Dashboard';
import MacetasPage from './pages/Macetas';
import VelasPage from './pages/Velas';
import PlantasPage from './pages/Plantas';
import OfertasPage from './pages/Ofertas';
import AjustesPage from './pages/Ajustes';
import InventarioPage from './pages/Inventario';
import ReportesPage from './pages/Reportes';
import OrdenesPage from './pages/Ordenes';
import OrdenesPersonalizadasPage from './pages/OrdenesPersonalizadas';

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<RecuperarPassword />} />
        <Route path="/verificar" element={<VerificarCodigo />} />
        <Route path="/nueva-contrasena" element={<NuevaContrasena />} />

        {/* Main Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ordenes" element={<OrdenesPage />} />
        <Route path="/ordenespersonalizadas" element={<OrdenesPersonalizadasPage />} />
        <Route path="/macetas" element={<MacetasPage />} />
        <Route path="/velas" element={<VelasPage />} />
        <Route path="/plantas" element={<PlantasPage />} />
        <Route path="/ofertas" element={<OfertasPage />} />
        <Route path="/inventario" element={<InventarioPage />} />
        <Route path="/reportes" element={<ReportesPage />} />
        <Route path="/ajustes" element={<AjustesPage />} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;