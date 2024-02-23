import { Container, IconButton, TextField } from '@mui/material';
import styles from './App.module.scss';
import { FC } from 'react';
import { ArrowForward } from '@mui/icons-material';

const App: FC = () => {
  return (
    <div className={styles.App}>
      <div className={styles.wordInputContainer}>
        <TextField id='word-input'
          placeholder='Enter a word'
          className={styles.wordInput}
          variant='standard' />
        <div>
          <IconButton aria-label="delete"
            size='large'>
            <ArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default App;
