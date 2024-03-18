/// <reference types='vite-plugin-svgr/client' />

import { Alert, Button, FilledInput, FormControl, FormHelperText, InputLabel, Link, Paper } from '@mui/material';
import { useFormik } from 'formik';
import { FC, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import { postRegister } from '../../services/authService';
import styles from './RegisterPage.module.scss';
import { useAuth } from '../../hooks/useAuth';
import { useIsMobile } from '../../hooks/useIsMobile';

interface RegisterPageProps { }

const RegisterPage: FC<RegisterPageProps> = () => {
  const auth = useAuth();
  const isMobile = useIsMobile();

  const [error, setError] = useState<string>('');

  const validationSchema = yup.object({
    username: yup
      .string()
      .min(3, 'Username should be longer than 3 characters')
      .max(32, 'Username should be shorter than 32 characters')
      .required('Username is required'),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password should have minimum 8 characters')
      .required('Password is required'),
    repeatPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Repeat password is required')
  });

  const formik = useFormik({
      initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, {setSubmitting}) => {
      postRegister(values.username, values.email, values.password)
        .then(() => {
          auth?.login();
        })
        .catch((error) => {
          if (error.response?.status === 409) {
            setError(error.response?.data.message);
          } else {
            setError('Something went wrong, try again');
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  return (
    <div className={styles.RegisterPage} data-testid='RegisterPage'>
      <RouterLink to='/'>
        <img className={styles.logo} alt='logo' src='logo.svg'></img>
      </RouterLink>
      <Paper sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        padding: '20px',
        alignItems: 'center',
        gap: '20px',
      }}>
        {
          !isMobile &&
          <img className={styles.registerLogo} alt='logo' src='register-logo.svg'></img>
        }
        <div className={styles.form}>
          <span className={styles.header}>Register</span>
          {
            error &&
            <Alert severity='error' variant='filled'
              className={styles.alert}
                onClose={() => { setError(''); }}>
              {error}
            </Alert>
          }
          <form className={styles.inputs} onSubmit={formik.handleSubmit}>
            <FormControl sx={{ width: '100%' }} variant='filled'
              error={formik.touched.username && !!formik.errors.username}>
              <InputLabel htmlFor='username-input'>Username</InputLabel>
              <FilledInput
                id='username-input'
                type='text'
                autoComplete='name'
                value={formik.values.username}
                onChange={formik.handleChange}
                name='username'
                autoFocus
              />
              {
                formik.touched.username &&
                <FormHelperText className={styles.helperText} id='username-helper-text'>
                  {formik.touched.username && formik.errors.username}
                </FormHelperText>
              }
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant='filled'
              error={formik.touched.email && !!formik.errors.email}>
              <InputLabel htmlFor='email-input'>Email</InputLabel>
              <FilledInput
                id='email-input'
                type='text'
                autoComplete='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {
                formik.touched.email &&
                <FormHelperText className={styles.helperText} id='email-helper-text'>
                  {formik.touched.email && formik.errors.email}
                </FormHelperText>
              }
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant='filled'
              error={formik.touched.password && !!formik.errors.password}>
              <InputLabel htmlFor='password-input'>Password</InputLabel>
              <FilledInput
                id='password-input'
                type='password'
                autoComplete='new-password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {
                formik.touched.password &&
                <FormHelperText className={styles.helperText} id='password-helper-text'>
                  {formik.touched.password && formik.errors.password}
                </FormHelperText>
              }
            </FormControl>
            <FormControl sx={{ width: '100%' }} variant='filled'
              error={formik.touched.repeatPassword && !!formik.errors.repeatPassword}>
              <InputLabel htmlFor='repeat-password-input'>Repeat password</InputLabel>
              <FilledInput
                id='repeat-password-input'
                type='password'
                autoComplete='new-password'
                name='repeatPassword'
                value={formik.values.repeatPassword}
                onChange={formik.handleChange}
              />
              {
                formik.errors.repeatPassword &&
                <FormHelperText className={styles.helperText} id='password-repeat-helper-text'>
                  {formik.touched.repeatPassword && formik.errors.repeatPassword}
                </FormHelperText>
              }
            </FormControl>
            <Button sx={{ width: '100%' }}
              variant='contained'
              type='submit'
              disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Registering' : 'Register'}
            </Button>
          </form>
          <div className={styles.loginLink}>
            <span>Already have account?</span>
            <Link component={RouterLink} to='/login'>Login</Link>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default RegisterPage;
