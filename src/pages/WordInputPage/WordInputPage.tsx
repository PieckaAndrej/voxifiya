import { ArrowForward } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import styles from './WordInputPage.module.scss';
import WordRow from './components/WordRow/WordRow';
import { Word } from '../../models/word';

interface WordInputPageProps { }

const WordInputPage: FC<WordInputPageProps> = () => {
  const [words, setWords] = useState<Word[]>([
    {
      text: 'hello',
      translation: 'hey'
    }
  ]);

  const [inputValue, setInputValue] = useState<string>('');

  let wordsEnd: HTMLDivElement | null = null;

  const onNewWordClick = useCallback(() => {
    if (inputValue.length > 0) {
      setWords(prevWords => [...prevWords, { text: inputValue }]);
      setInputValue('');
    }
  }, [inputValue]);

  useEffect(() => {
    function keydownHandler(e: KeyboardEvent) {
      if (e.key === 'Enter') onNewWordClick();
    }

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [inputValue, onNewWordClick]);

  useEffect(() => {
    wordsEnd?.scrollIntoView();
  }, [words, wordsEnd]);

  function onTextChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function renderWords() {
    return words.map((word, id) => {
      return <WordRow word={word} key={id} />;
    });
  }

  return (
    <div className={styles.WordInput} data-testid='WordInput'>
      <div className={styles.words}>
        {renderWords()}
        <div style={{ float:'left', clear: 'both' }}
             ref={(el) => { wordsEnd = el; }}>
        </div>
      </div>
      <div className={styles.inputRow}>
        <TextField
          id='word-input'
          placeholder='Type here'
          autoFocus={true}
          className={styles.input}
          onChange={onTextChange}
          value={inputValue}
          variant='standard' />
        <div>
          <IconButton
            onClick={onNewWordClick}
            aria-label="arrow-forward"
            size='large'>
            <ArrowForward />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default WordInputPage;