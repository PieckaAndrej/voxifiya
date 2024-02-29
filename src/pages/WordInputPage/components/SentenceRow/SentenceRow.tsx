import React, { FC } from 'react';
import styles from './SentenceRow.module.scss';
import { Sentence } from '../../../../models/sentence';

interface SentenceRowProps {
  sentence: Sentence;
}

const SentenceRow: FC<SentenceRowProps> = (props) => {
  return (
    <div className={styles.SentenceRow} data-testid="SentenceRow">
      <span className={styles.text}>
        {props.sentence.text}
      </span>
      <span className={styles.translation}>
        {props.sentence.translatedText}
      </span>
    </div>
  );
};

export default SentenceRow;
