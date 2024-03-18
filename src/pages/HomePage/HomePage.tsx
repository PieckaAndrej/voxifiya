import { Button } from '@mui/material';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './HomePage.module.scss';
import './letters.scss'
import Logo from "../../assets/register-letters.svg?react";

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => (
  <div className={styles.HomePage} data-testid="HomePage">
    <Logo className={styles.logo}/>
    <div className={styles.welcome}>
      <h1>Welcome to Voxifiya</h1>
      <div className={styles.buttons}>
        <Button variant='contained' component={RouterLink} to='/register'>Register</Button>
        <Button variant='contained' component={RouterLink} to='/login'>Login</Button>
      </div>
    </div>
  </div>
);

export default HomePage;
