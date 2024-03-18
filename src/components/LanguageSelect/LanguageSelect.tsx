import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import styles from './LanguageSelect.module.scss';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Autocomplete, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { getLanguages } from '../../services/sentenceService';
import { Language } from '../../models/language';
import { patchMe } from '../../services/userService';

interface LanguageSelectProps {
  canClose: boolean;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const LanguageSelect: FC<LanguageSelectProps> = (props) => {
  const auth = useAuth();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [inputValue, setInputValue] = useState<Language | null>(null);

  useEffect(() => {
    if (props.dialogOpen) {
      getLanguages()
        .then((response) => {
          setLanguages(response.data);

          if (auth?.user?.defaultLanguage) {
            setInputValue(response.data.find(l => l.code === auth.user?.defaultLanguage?.code) ?? null);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.dialogOpen, auth?.user?.defaultLanguage, setLanguages]);

  const handleDialogSelect = () => {
    if (inputValue) {
      patchMe(inputValue)
        .then((response) => {
          props.setDialogOpen(false);

          const user = auth?.user;

          if (user) {
            user.defaultLanguage = response.data.defaultLanguage;

            auth.setUser({...user});
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onInputChange = (e: React.SyntheticEvent, value: Language | null) => {
    e.preventDefault();

    setInputValue(value);
  };

  return (
    <div className={styles.LanguageSelect} data-testid='LanguageSelect'>
      <Dialog
        open={props.dialogOpen}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)' }
          }
        }}
        disableEscapeKeyDown={!props.canClose}
        onClose={() => {
          if (props.canClose) {
            props.setDialogOpen(false);
          }
        }}
        aria-labelledby='language-dialog-title'
        aria-describedby='language-dialog-description'>
        <DialogTitle id='language-dialog-title'>
          Select Language
        </DialogTitle>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px'
        }}>
          <DialogContentText id='language-dialog-description'>
            Select a language you want to practice
          </DialogContentText>
          <Autocomplete
            id='language-selection'
            slotProps={{
              paper: {
                sx: {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))',
                  backdropFilter: 'blur(10px)'
                }
              }
            }}
            value={inputValue}
            onChange={onInputChange}
            options={languages}
            getOptionLabel={(option) => option.name}
            getOptionKey={(option) => option.code}
            renderInput={(params) => <TextField {...params} label='Language' />}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={!inputValue}
            onClick={handleDialogSelect}>
              Select
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LanguageSelect;
