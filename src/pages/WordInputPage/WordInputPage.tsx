import { ArrowForward } from '@mui/icons-material';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useAuth } from '../../hooks/useAuth';
import { Page } from '../../models/page';
import { Sentence } from '../../models/sentence';
import { getSentences, postSentence } from '../../services/sentenceService';
import styles from './WordInputPage.module.scss';
import SentenceRow from './components/SentenceRow/SentenceRow';

interface WordInputPageProps { }

const WordInputPage: FC<WordInputPageProps> = () => {
  const auth = useAuth();
  const [sentences, setSentences] = useState<Page<Sentence>>({
    items: []
  });
  const [editing, setEditing] = useState<Sentence | null>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [scroll, setScroll] = useState<boolean>(false);
  const [textInputAtBottom, setTextInputAtBottom] = useState<boolean>(false);

  const wordsEndRef = useRef<HTMLDivElement>(null);
  const textInputRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const textInputMarginTop = 10;

  const onNewWordClick = useCallback(() => {
    if (inputValue.length > 1) {
      setInputValue('');

      postSentence({ text: inputValue, language: auth?.user?.defaultLanguage ?? '' })
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

  // If new sentence scroll to it
  useEffect(() => {
    if (scroll) {
      wordsEndRef?.current?.scrollIntoView({behavior: 'smooth'});
      setScroll(false);
    }
  }, [scroll, sentences, setScroll]);

  // For registering if enter was pressed
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

  const onUpdateSentence = (sentence: Sentence) => {
    setSentences(prevSentences => {
      const index = prevSentences.items.findIndex(s => s.id === sentence.id);
      prevSentences.items[index] = sentence;

      return {...prevSentences};
    });
  };

  const renderSentences = () => {
    return sentences?.items.map((sentence, id) => {
      return (
        <SentenceRow sentence={sentence}
          key={id}
          editing={editing === sentence}
          updateSentence={onUpdateSentence}
          setEditing={(editing) => setEditing(editing ? sentence : null)}/>
      );
    });
  };

  useEffect(() => {
    if (!!scrollRef.current && !!textInputRef.current) {
      const scrollContainer = scrollRef.current;
      const targetElement = textInputRef.current;


      const handleScroll = () => {
        const containerRect = scrollContainer.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();

        // Check if the bottom of the target element is within the viewport
        const isBottomVisible = (textInputAtBottom ?
          (targetRect.top - textInputMarginTop) : targetRect.bottom)
          > containerRect.bottom - textInputMarginTop;

        setTextInputAtBottom(isBottomVisible);
      };

      // Attach the scroll event listener
      scrollContainer.addEventListener('scroll', handleScroll);

      // Initial check
      handleScroll();

      // Clean up the event listener on component unmount
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [scrollRef, textInputRef, textInputAtBottom, textInputMarginTop, setTextInputAtBottom]);

  const renderTextField = (floating: boolean) => {
    const classes = [styles.inputRow];

    // Assign classes based on if it's floating or not
    if (floating) {
      classes.push(styles.floatingInput);
    } else if (textInputAtBottom) {
      classes.push(styles.hiddenInput);
    }

    return (
      <div className={classes.join(' ')} ref={floating ? null : textInputRef}>
        <TextField
          id={floating ? 'text-input' : 'text-input-floating'}
          placeholder='Type here'
          autoFocus={true}
          className={styles.input}
          onChange={onTextChange}
          value={inputValue}
          autoComplete='off'
          sx={{maxWidth: '300px', justifySelf: 'flex-end'}}
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
    );
  };

  return (
    <div className={styles.WordInputPage} data-testid='WordInputPage'>
      {textInputAtBottom && renderTextField(true)}
      <div className={styles.scroll} ref={scrollRef}
        style={textInputAtBottom ?
          {marginBottom: `${(textInputRef.current?.clientHeight ?? 0) + textInputMarginTop}px`} : {}}>
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
        {renderTextField(false)}
      </div>
    </div>
  );
};

export default WordInputPage;
