import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Alert, Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Link } from '@mui/material';
import { AxiosError } from 'axios';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { postLogin } from '../../services/authService';
import styles from './LoginPage.module.scss';

interface LoginPageProps { }

const LoginPage: FC<LoginPageProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    user: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const auth = useAuth();

  const onClickShowPassword = () => setShowPassword((show) => !show);

  const onMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onFormInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues(prevFormValues => {
      return {
        ...prevFormValues,
        [e.target.name]: e.target.value
      };
    });
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    setSubmitDisabled(true);

    postLogin(formValues.user, formValues.password)
      .then(() => {
        auth?.login();
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          setError('Incorrect username or password');
        } else {
          setError('Something went wrong, try again');
        }
      })
      .finally(() => {
        setSubmitDisabled(false);
      });
  };

  return (
    <div className={styles.LoginPage} data-testid="LoginPage">
      <span className={styles.header}>Login</span>
      {
        error &&
        <Alert severity='error' variant='filled'
          className={styles.alert}
          onClose={() => {setError('');}}>
          {error}
        </Alert>
      }
      <form className={styles.inputs} onSubmit={onFormSubmit}>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="user-input">Email / Username</InputLabel>
          <FilledInput
            id="user-input"
            type='text'
            autoComplete='email'
            value={formValues.user}
            name='user'
            autoFocus
            onChange={(e) => onFormInputChange(e)}
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <FilledInput
            id="password-input"
            autoComplete='current-password'
            name='password'
            type={showPassword ? 'text' : 'password'}
            value={formValues.password}
            onChange={(e) => onFormInputChange(e)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={onClickShowPassword}
                  onMouseDown={onMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button sx={{ width: '100%' }}
          variant='contained'
          type='submit'
          disabled={submitDisabled}>
          {submitDisabled ? 'Logging in' : 'Login'}
        </Button>
      </form>
      <div className={styles.registerLink}>
        <span>New here?</span>
        <Link component={RouterLink} to='/register'>Register</Link>
      </div>
    </div>
  );
};

export default LoginPage;
