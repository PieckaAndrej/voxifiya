import React, { FC } from 'react';
import styles from './ErrorView.module.scss';

interface ErrorViewProps {}

const ErrorView: FC<ErrorViewProps> = () => (
  <div className={styles.ErrorView} data-testid="ErrorView">
    ErrorView Component
  </div>
);

export default ErrorView;
