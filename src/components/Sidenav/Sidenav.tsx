import React, { FC } from 'react';
import styles from './Sidenav.module.scss';
import { Button } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';

interface SidenavProps {}

const Sidenav: FC<SidenavProps> = () => {
  const auth = useAuth();

  return (
    <div className={styles.Sidenav} data-testid='Sidenav'>
      <Button size='small' onClick={() => auth?.logout()}>
        Logout
      </Button>
    </div>
  );
};

export default Sidenav;
