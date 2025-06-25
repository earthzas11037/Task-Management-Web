import { Backdrop, CircularProgress } from '@mui/material';
import useAppStore from '../stores/app/useAppStore';

const Loading = () => {
  const { loading } = useAppStore();

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 99999,
      }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
