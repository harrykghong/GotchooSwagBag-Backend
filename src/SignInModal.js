import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Auth } from 'aws-amplify';



function SignInModal({onSignInSuccess, onSignUpClick}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      onSignInSuccess();
      // Handle successful sign-in, e.g., redirect to a secured page
    } catch (error) {
      console.error('Error signing in:', error);
      if (error.name === 'UserNotConfirmedException') {
        setEmailError('Email not confirmed. Please check your email for a confirmation code.');
      } else if (error.name === 'NotAuthorizedException') {
        setPasswordError('Incorrect email or password. Please try again.');
        setEmailError('Incorrect email or password. Please try again.');
      } else {
        setEmailError('Failed to sign in. Please try again.');
        setPasswordError('Failed to sign in. Please try again.');
      }
    }
  };

  const handleSignUpLinkClick = () => {
    onSignUpClick();
  };

  return (
    <form onSubmit={handleSignIn}>
      <Grid container spacing={1}>
        <Typography variant="h5" align="left" gutterBottom>
            Sign In
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleEmailChange}
          error={emailError.length > 0}
          helperText={emailError}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handlePasswordChange}
          error={passwordError.length > 0}
          helperText={passwordError}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={handleSignUpLinkClick}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};



export default SignInModal;
