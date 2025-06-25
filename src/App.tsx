import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import { useAuthStore } from './stores/auth/useAuthStore';
import TaskListPage from './pages/task/TaskListPage';
import AuthGuard from './components/AuthGuard';
import AppReactToastify from './libs/styles/AppReactToastify';
import MainLayout from './components/layout/MainLayout';
import Loading from './components/Loading';

function App() {
  const token = useAuthStore((s) => s.token);

  return (
    <>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/tasks" replace /> : <LoginPage />} />
        <Route path="/signup" element={token ? <Navigate to="/tasks" replace /> : <SignupPage />} />

        <Route
          path="/tasks"
          element={
            <AuthGuard>
              <MainLayout>
                <TaskListPage />
              </MainLayout>
            </AuthGuard>
          }
        />

        {/* default redirect */}
        <Route path="*" element={<Navigate to={token ? '/tasks' : '/login'} replace />} />
      </Routes>
      <AppReactToastify hideProgressBar />
      <Loading />
    </>
  );
}

export default App;
