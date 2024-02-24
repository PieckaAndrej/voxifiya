import { Outlet } from 'react-router-dom';
import styles from './App.module.scss';
import { FC } from 'react';

const App: FC = () => {
  return (
    <div className={styles.App}>
      <Outlet/>
    </div>
  );
};

export default App;
