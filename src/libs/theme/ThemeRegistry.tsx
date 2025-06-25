import { ThemeProvider, CssBaseline } from '@mui/material';
import { ReactNode } from 'react';
import theme from '../../configs/theme';

type Props = {
  children: ReactNode;
};

const ThemeRegistry = ({ children }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeRegistry;
