import React, { FC } from 'react';
import styles from './ErrorPage.module.scss';

interface ErrorPageProps {}

const ErrorPage: FC<ErrorPageProps> = () => (
  <div className={styles.ErrorView} data-testid="ErrorPage">
    ErrorView Component
  </div>
);

export default ErrorPage;
