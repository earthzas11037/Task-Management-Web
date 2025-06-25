import { useForm } from 'react-hook-form';
import { TextField, Button, Typography, Box, Divider, InputAdornment, IconButton } from '@mui/material';
import { IconEye, IconEyeOff, IconLogin } from '@tabler/icons-react';
import { useAuthStore } from '../../stores/auth/useAuthStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { showErrorToast } from '../../utils/toast';
import { useState } from 'react';

interface LoginFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = new URLSearchParams(location.search).get('redirectTo') || '/tasks';
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await login(data.email, data.password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      showErrorToast('ลงชื่อเข้าใช้ไม่สำเร็จ');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center px-4">
      <Box className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-5">
        <Typography variant="h5" gutterBottom className="flex items-center gap-2 mb-6 font-semibold">
          <IconLogin size={26} /> ลงชื่อเข้าใช้
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <TextField
            label="Email"
            fullWidth
            {...register('email', {
              required: 'กรุณาระบุอีเมล',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'รูปแบบอีเมลไม่ถูกต้อง',
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            {...register('password', {
              required: 'กรุณาระบุรหัสผ่าน',
              pattern: {
                value: /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/,
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร และประกอบด้วยตัวพิมพ์เล็กและตัวเลข',
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth size="large">
            ยืนยัน
          </Button>
        </form>

        <Divider className="my-6" />

        <div className="text-center space-y-5">
          <Button variant="outlined" fullWidth className="mt-3" onClick={() => navigate('/signup')}>
            สมัครสมาชิก
          </Button>
        </div>
      </Box>
    </Box>
  );
}
