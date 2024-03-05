import { Close, Done, Edit, SettingsBackupRestore } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { TransparentTooltip } from '../../../../components/TransparentTooltip';
import { Sentence } from '../../../../models/sentence';
import { patchSentence } from '../../../../services/sentenceService';
import styles from './SentenceRow.module.scss';

interface SentenceRowProps {
  sentence: Sentence;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  updateSentence: (sentence: Sentence) => void;
}

const SentenceRow: FC<SentenceRowProps> = (props) => {
  const [hovered, setHovered] = useState(false);
  const [inputValue, setInputValue] = useState(props.sentence.translatedText);

  const onTextChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const callPatchSentence = (text: string | undefined) => {
    patchSentence(props.sentence.id ?? '', text)
      .then((rensponse) => {
        props.updateSentence(rensponse.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onEditDone = () => {
    props.setEditing(false);

    callPatchSentence(inputValue ?? undefined);
  };

  const onEditCancel = () => {
    props.setEditing(false);
    setInputValue(props.sentence.translatedText);
  };

  const onSetOriginal = () => {
    props.setEditing(false);
    callPatchSentence(undefined);
  }

  useEffect(() => {
    setInputValue(props.sentence.translatedText);
  }, [props, setInputValue])

  return (
    <div className={styles.SentenceRow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid="SentenceRow">
      <span className={styles.text}>
        {props.sentence.text}
      </span>
      <span className={styles.translation}>
        {
          props.editing ? (
            <>
              <TextField
                value={inputValue}
                autoComplete='off'
                variant='standard'
                placeholder='Translation'
                className={styles.input}
                onChange={onTextChange}
                sx={{maxWidth: '200px'}}
                autoFocus={true} />
              <TransparentTooltip title='Done'
                disableHoverListener={(inputValue?.length ?? 0) === 0 || 
                      inputValue?.toLowerCase() === props.sentence.translatedText}>
                <span style={{display: 'flex'}}>
                  <IconButton onClick={() => onEditDone()}
                    disabled={(inputValue?.length ?? 0) === 0 || 
                      inputValue?.toLowerCase() === props.sentence.translatedText}>
                    <Done />
                  </IconButton>
                </span>
              </TransparentTooltip>
              <TransparentTooltip title='Cancel'>
                <IconButton onClick={() => onEditCancel()}>
                  <Close />
                </IconButton>
              </TransparentTooltip>
              {
                props.sentence.customTranslation &&
                <TransparentTooltip title='Back to original'>
                  <IconButton onClick={() => onSetOriginal()}>
                    <SettingsBackupRestore />
                  </IconButton>
                </TransparentTooltip>
              }
            </>
          ) : (
            props.sentence.translatedText
          )
        }
        {
          hovered && !props.editing &&
          <IconButton onClick={() => props.setEditing(true)}>
            <Edit />
          </IconButton>
        }
      </span>
    </div>
  );
};

export default SentenceRow;
