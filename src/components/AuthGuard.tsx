import { ReactNode, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuthStore } from '../stores/auth/useAuthStore';

interface Props {
  children: ReactNode;
  isAdmin?: boolean;
}

export default function AuthGuard({ children }: Props) {
  const token = useAuthStore((s) => s.token);
  const setToken = useAuthStore((s) => s.setToken);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieToken = Cookies.get('token');
    if (!token && cookieToken) {
      setToken(cookieToken);
      navigate(`/login?redirectTo=${location.pathname}`, { replace: true });
    }

    if (!token && !cookieToken) {
      navigate(`/login?redirectTo=${location.pathname}`, { replace: true });
    }
  }, [token]);

  return <>{token ? children : null}</>;
}
