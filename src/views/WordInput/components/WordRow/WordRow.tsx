import React, { FC } from 'react';
import styles from './WordRow.module.scss';
import { Typography } from '@mui/material';

interface WordRowProps {
  word: Word;
}

const WordRow: FC<WordRowProps> = (props) => {
  return (
    <div className={styles.WordRow} data-testid="WordRow">
      <span className={styles.text}>
        {props.word.text}
      </span>
      <span className={styles.translation}>
        {props.word.translation}
      </span>
    </div>
  );
}

export default WordRow;
