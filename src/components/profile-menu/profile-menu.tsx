import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '../../services/store';
import { logoutUser } from '../../services/auth/actions';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatcher = useDispatch();

  const handleLogout = () => {
    console.log('handleLogout');
    dispatcher(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
