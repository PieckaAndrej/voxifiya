import { Close, Delete, Done, Edit, InfoOutlined, SettingsBackupRestore } from '@mui/icons-material';
import { Backdrop, BackdropRoot, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from '@mui/material';
import { ChangeEvent, FC, Fragment, useEffect, useState } from 'react';
import { TransparentTooltip } from '../../../../components/TransparentTooltip';
import { Sentence } from '../../../../models/sentence';
import { deleteSentence, patchSentence } from '../../../../services/sentenceService';
import styles from './SentenceRow.module.scss';

interface SentenceRowProps {
  sentence: Sentence;
  editing: boolean;
  setEditing: (editing: boolean) => void;
  updateSentence: (sentence: Sentence) => void;
  deleteSentence: (sentence: Sentence) => void;
}

const SentenceRow: FC<SentenceRowProps> = (props) => {
  const [hovered, setHovered] = useState(false);
  const [inputValue, setInputValue] = useState(props.sentence.translatedText);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const callDeleteSentence = () => {
    setDialogOpen(false);
    setHovered(false);

    deleteSentence(props.sentence.id ?? '')
      .then((response) => {
        props.deleteSentence(response.data);
      })
      .catch((error) => {
        console.log(error)
      });
  };

  const onDeleteClick = () => {
    setDialogOpen(true);
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

  const handleDialogClose = () => {
    setDialogOpen(false);
    setHovered(false);
  };

  useEffect(() => {
    setInputValue(props.sentence.translatedText);
  }, [props, setInputValue]);

  return (
    <div className={styles.SentenceRow}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-testid="SentenceRow">
      <span className={styles.text}>
        {
          props.sentence.conflict && 
          <TransparentTooltip title="This sentence is already present. It won't be added a second time.">
            <InfoOutlined sx={{color: 'rgba(255, 255, 255, 0.4)'}}/>
          </TransparentTooltip>
        }
        {props.sentence.text}
      </span>
      <span className={styles.translation}>
        {
          props.editing ? (
            <Fragment>
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
            </Fragment>
          ) : (
            props.sentence.translatedText
          )
        }
        {
          hovered && !props.sentence.conflict && !props.editing &&
          <Fragment>
            <IconButton onClick={() => props.setEditing(true)}>
              <Edit />
            </IconButton>
            <IconButton onClick={() => onDeleteClick()}>
              <Delete />
            </IconButton>
          </Fragment>
        }
      </span>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        slotProps={{
          backdrop: {
            sx: {backgroundColor: 'rgba(0, 0, 0, 0.4)'}
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">
          {`Delete ${props.sentence.text}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`This will permanently delete ${props.sentence.text} and its progress`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={() => callDeleteSentence()} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SentenceRow;
