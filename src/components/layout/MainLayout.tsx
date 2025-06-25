import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/auth/useAuthStore';

interface Props {
  children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box className="min-h-screen w-full">
      <Box className="p-4 flex justify-end bg-white shadow">
        <Button variant="contained" color="error" onClick={handleLogout}>
          ลงชื่อออก
        </Button>
      </Box>
      <Box className="">{children}</Box>
    </Box>
  );
}
