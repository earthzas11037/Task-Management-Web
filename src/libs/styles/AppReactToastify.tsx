'use client';

// MUI Imports
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import type { BoxProps } from '@mui/material/Box';
import type { Theme } from '@mui/material/styles';

// Third-party Imports
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { ToastContainerProps, ToastPosition } from 'react-toastify';

type Props = ToastContainerProps & {
  boxProps?: BoxProps;
};

const ToastifyWrapper = ({ children }: { children: React.ReactNode }) => {
  const isSmallScreen = useMediaQuery((theme: Theme) => theme.breakpoints.down(480));

  return (
    <Box
      sx={{
        ...(isSmallScreen && {
          '& .Toastify__toast-container': {
            marginBlockStart: 3,
            marginInline: 3,
            width: 'calc(100dvw - 1.5rem)',
          },
        }),
        '& .Toastify__toast': {
          minBlockSize: 46,
          borderRadius: 1,
          padding: '12px 20px',
          backgroundColor: 'background.paper',
          boxShadow: (theme) => theme.shadows[3],
          border: (theme) => `1px solid ${theme.palette.divider}`,
          ...(isSmallScreen && {
            marginBlockEnd: 4,
          }),
          '&:not(.custom-toast)': {
            '& .Toastify__toast-body': {
              color: 'text.primary',
            },
            '&.Toastify__toast--success svg': {
              fill: 'success.main',
            },
            '&.Toastify__toast--error svg': {
              fill: 'error.main',
            },
            '&.Toastify__toast--warning svg': {
              fill: 'warning.main',
            },
            '&.Toastify__toast--info svg': {
              fill: 'info.main',
            },
          },
        },
        '& .Toastify__toast-body': {
          margin: 0,
          lineHeight: 1.46667,
          fontSize: 'body1.fontSize',
        },
        '& .Toastify__toast-icon': {
          marginRight: 3,
          height: 20,
          width: 20,
        },
        '& .Toastify__close-button': {
          color: 'text.primary',
        },
      }}
    >
      {children}
    </Box>
  );
};

const AppReactToastify = (props: Props) => {
  const { boxProps, ...rest } = props;

  const positionMap: Partial<Record<ToastPosition, ToastPosition>> = {
    'top-right': 'top-left',
    'top-left': 'top-right',
    'bottom-left': 'bottom-right',
    'bottom-right': 'bottom-left',
    'top-center': 'top-center',
    'bottom-center': 'bottom-center',
  };

  const position = 'top-right';

  return (
    <ToastifyWrapper {...boxProps}>
      <ToastContainer position={position} {...rest} />
    </ToastifyWrapper>
  );
};

export default AppReactToastify;
