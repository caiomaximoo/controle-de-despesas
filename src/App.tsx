import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { DashboardView } from './views/DashboardView';
import { ExpensesView } from './views/ExpensesView';
import { LoginView } from './views/auth/LoginView';
import { RegisterView } from './views/auth/RegisterView';
import { ForgotPasswordView } from './views/auth/ForgotPasswordView';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas de Autenticação */}
          <Route path="/login" element={<LoginView />} />
          <Route path="/cadastro" element={<RegisterView />} />
          <Route path="/recuperar-senha" element={<ForgotPasswordView />} />

          {/* Rotas Privadas e Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/" element={<DashboardView />} />
              <Route path="/despesas" element={<ExpensesView />} />
            </Route>
          </Route>

          {/* Redirecionamento Padrão */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
