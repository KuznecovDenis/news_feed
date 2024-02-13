import { RouteProps, Navigate } from 'react-router-dom';
import React, { FC } from 'react';
import { useAuthContext } from '../../Features/Auth/AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';

type TProps = {
  children: React.ReactNode;
} & RouteProps;

export const PrivetRoute: FC<TProps> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();
  const location = useLocation();

  if (isAuthenticated === null) {
    // если статус авторизации пока неизвестен
    return (
      <Box sx={{ p: 6, textAlign: 'center' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};
