import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AddDoctorPage from './pages/AddDoctorPage';
import UpdateDoctorPage from './pages/UpdateDoctorPage';
import DoctorsPage from './pages/DoctorsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  SignedInProtectedRoute,
  ProtectedRoute,
  AdminProtectedRoute,
} from './shared/utils/auth-routes';

import AuthContext from './shared/context/auth-context';
import { useAuth } from './shared/hooks/use-auth';

const App = () => {
  const { token, login, logout, userId, isAdmin } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        isAdmin,
      }}
    >
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/welcome" replace />} />

          <Route path="/welcome" element={<HomePage />} />

          <Route
            path="/auth"
            element={
              <SignedInProtectedRoute>
                <AuthPage />
              </SignedInProtectedRoute>
            }
          />

          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <DoctorsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <AppointmentsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-doctor"
            element={
              <AdminProtectedRoute>
                <AddDoctorPage />
              </AdminProtectedRoute>
            }
          />

          <Route
            path="/doctors/:doctorId"
            element={
              <AdminProtectedRoute>
                <UpdateDoctorPage />
              </AdminProtectedRoute>
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
