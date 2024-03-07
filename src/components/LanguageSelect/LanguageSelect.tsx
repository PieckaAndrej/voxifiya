import React, { FC, useEffect, useState } from 'react';
import styles from './LanguageSelect.module.scss';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Autocomplete, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { getLanguages } from '../../services/sentenceService';
import { Language } from '../../models/language';
import { patchMe } from '../../services/userService';

interface LanguageSelectProps { }

const LanguageSelect: FC<LanguageSelectProps> = () => {
  const auth = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [inputValue, setInputValue] = useState<Language | null>(null);

  useEffect(() => {
    if (!auth?.user?.defaultLanguage) {
      setDialogOpen(true);

      getLanguages()
        .then((response) => {
          setLanguages(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth, setDialogOpen, setLanguages]);

  const handleDialogSelect = () => {
    if (inputValue) {
      patchMe(inputValue?.language)
        .then((response) => {
          setDialogOpen(false);

          const user = auth?.user;

          if (user) {
            user.defaultLanguage = response.data.defaultLanguage;

            auth.setUser(user);
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
        open={dialogOpen}
        slotProps={{
          backdrop: {
            sx: { backgroundColor: 'rgba(0, 0, 0, 0.4)' }
          }
        }}
        disableEscapeKeyDown={true}
        onClose={() => { }}
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
            getOptionKey={(option) => option.language}
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
