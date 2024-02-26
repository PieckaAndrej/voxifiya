import { Link } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './HomePage.module.scss';

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <div className={styles.HomePage} data-testid="HomePage">
    <Link component={RouterLink} to='/register'>Register</Link>
    <Link component={RouterLink} to='/login'>Login</Link>
  </div>
);

export default HomePage;
