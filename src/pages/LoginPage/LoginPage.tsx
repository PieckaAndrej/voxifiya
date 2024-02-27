import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, Link } from '@mui/material';
import Cookies from 'js-cookie';
import { ChangeEvent, FC, FormEvent, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { postLogin } from '../../services/authService';
import styles from './LoginPage.module.scss';

interface LoginPageProps { }

const LoginPage: FC<LoginPageProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({
    user: '',
    password: ''
  });

  const auth = useAuth();

  const [, setCsrfToken] = useLocalStorage('csrfToken', null);

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

    postLogin(formValues.user, formValues.password)
      .then(() => {
        setCsrfToken(Cookies.get('X-CSRF-Token'));

        auth?.login('/words');
      })
      .catch(() => {
        // TODO catch error
      });
  };

  return (
    <div className={styles.LoginPage} data-testid="LoginPage">
      <span className={styles.header}>Login</span>
      <form className={styles.inputs} onSubmit={onFormSubmit}>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="user-input">Email / Username</InputLabel>
          <FilledInput
            id="user-input"
            type='text'
            autoComplete='email'
            value={formValues.user}
            name='user'
            onChange={(e) => onFormInputChange(e)}
          />
          <FormHelperText id="component-error-text"></FormHelperText>
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <InputLabel htmlFor="password-input">Password</InputLabel>
          <FilledInput
            id="password-input"
            autoComplete='password'
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
          <FormHelperText id="component-error-text"></FormHelperText>
        </FormControl>
        <Button sx={{ width: '100%' }} variant='contained' type='submit'>
          Login
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
