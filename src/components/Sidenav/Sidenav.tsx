import React, { FC } from 'react';
import styles from './Sidenav.module.scss';

interface SidenavProps {}

const Sidenav: FC<SidenavProps> = () => {
  return (
    <div className={styles.Sidenav} data-testid='Sidenav'>
    </div>
  );
};

export default Sidenav;
