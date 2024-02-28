import { ArrowForward } from '@mui/icons-material';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './WordInputPage.module.scss';
import SentenceRow from './components/SentenceRow/SentenceRow';
import { Sentence } from '../../models/sentence';
import { getSentences, postSentence } from '../../services/sentenceService';
import { useAuth } from '../../hooks/useAuth';
import InfiniteScroll from 'react-infinite-scroller';
import { Page } from '../../models/page';

interface WordInputPageProps { }

const WordInputPage: FC<WordInputPageProps> = () => {
  const auth = useAuth();
  const [sentences, setSentences] = useState<Page<Sentence>>({
    items: []
  });

  const [inputValue, setInputValue] = useState<string>('');
  const [scroll, setScroll] = useState<boolean>(false);

  let wordsEndRef = useRef<HTMLDivElement>(null);

  const onNewWordClick = useCallback(() => {
    if (inputValue.length > 1) {
      setInputValue('');

      postSentence({ requestText: inputValue, language: auth?.user?.defaultLanguage ?? '' })
        .then((response) => {
          setSentences(prevSentences => {
            return {
              ...prevSentences,
              items: [response.data, ...prevSentences.items]
            };
          });

          setScroll(true);

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [inputValue, auth, setSentences, setScroll]);

  useEffect(() => {
    if (scroll) {
      wordsEndRef?.current?.scrollIntoView({behavior: 'smooth'});
      setScroll(false);
    }
  }, [scroll, sentences, setScroll])

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') onNewWordClick();
    };

    document.addEventListener('keydown', keydownHandler);

    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, [inputValue, onNewWordClick]);

  const loadSentences = () => {
    getSentences(auth?.user?.defaultLanguage ?? '',
      sentences.items[sentences.items.length - 1]?.createdDate)

      .then((response) => {

        setSentences(prevSentences => {
          let items = prevSentences.items;

          if (prevSentences.items[prevSentences.items.length - 1]?.id !==
            response.data.items[response.data.items.length - 1]?.id) {

            items = prevSentences?.items ?
              prevSentences.items.concat(response.data.items) :
              response.data.items;
          }

          return {
            ...response.data,
            items
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const renderSentences = () => {
    return sentences?.items.map((sentence, id) => {
      return <SentenceRow sentence={sentence} key={id} />;
    });
  };

  return (
    <div className={styles.WordInputPage} data-testid='WordInputPage'>
      <div className={styles.scroll}>
        <InfiniteScroll
            loadMore={loadSentences}
            hasMore={sentences?.hasNextPage ?? true}
            initialLoad={true}
            isReverse={true}
            useWindow={false}
            loader={
              <div className={styles.loading} key={0}>
                <CircularProgress />
              </div>
            }>
          <div className={styles.sentences}>
            {renderSentences()}
          </div>
        </InfiniteScroll>
        <div style={{ float:'left', clear: 'both' }}
            ref={wordsEndRef}>
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
          autoComplete='off'
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
