import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../stores/auth/useAuthStore';
import { TextField, Button, Typography, Box, Divider, InputAdornment, IconButton } from '@mui/material';
import { IconEye, IconEyeOff, IconUserPlus } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { useState } from 'react';

interface SignupFormInput {
  email: string;
  password: string;
  confirmPassword: string;
}

const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInput>({ mode: 'onTouched' });

  const signup = useAuthStore((s) => s.signup);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const password = watch('password');

  const onSubmit = async (data: SignupFormInput) => {
    try {
      await signup(data.email, data.password);
      showSuccessToast('สมัครสมาชิกสำเร็จ');
      navigate('/login');
    } catch (err) {
      showErrorToast('ไม่สามารถสมัครสมาชิกได้');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center px-4 ">
      <Box className="w-full max-w-md bg-white p-8 rounded-xl shadow-md space-y-5">
        <Typography variant="h5" gutterBottom className="flex items-center gap-2 mb-6 font-semibold">
          <IconUserPlus size={26} /> สมัครสมาชิก
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
                value: passwordRegex,
                message: 'รหัสผ่านต้องมีอย่างน้อย 8 ตัว มีตัวพิมพ์เล็ก และตัวเลข',
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

          <TextField
            label="ยืนยันรหัสผ่าน"
            type={showConfirm ? 'text' : 'password'}
            fullWidth
            {...register('confirmPassword', {
              required: 'กรุณายืนยันรหัสผ่าน',
              validate: (value) => value === password || 'รหัสผ่านไม่ตรงกัน',
            })}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end">
                    {showConfirm ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            สมัครสมาชิก
          </Button>
        </form>

        <Divider className="my-6" />

        <div className="text-center space-y-5">
          <Button variant="outlined" fullWidth className="mt-3" onClick={() => navigate('/login')}>
            เข้าสู่ระบบ
          </Button>
        </div>
      </Box>
    </Box>
  );
}
