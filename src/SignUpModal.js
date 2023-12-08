import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Auth } from 'aws-amplify';
import { useAuth } from './authContext'; 

function SignUpModal({ onSignUpSuccess }) {
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [email, setEmail] = useState('');
    const [userConfirmed, setUserConfirmed] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [hasSignedUp, setHasSignedUp] = useState(false);
    const { user, signIn, signOut, goToNextStep } = useAuth();

    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);

        if (newPassword.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
        } else {
            setPasswordError('');
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const emailValue = data.get('email');
        const passwordValue = data.get('password');
    
        setEmail(emailValue); // This updates the state
        setPassword(passwordValue); // This updates the state if needed
    
        try {
            const { user } = await Auth.signUp({
                username: emailValue, // Use the local variable here
                password: passwordValue,
                attributes: {
                    email: emailValue, // Use the local variable here
                },
                autoSignIn: {
                    enabled: true,
                },
            });
            console.log(user);
            setHasSignedUp(true);
            // Proceed to the next modal or user flow
        } catch (error) {
            if (error.name === 'UsernameExistsException') {
                setEmailError('An account with the given email already exists.');
            } else {
                console.error('Error signing up:', error);
                setEmailError('Failed to sign up. Please try again.');
            }
        }
    };
    

    const handleConfirmationCodeChange = (event) => {
        setConfirmationCode(event.target.value);
    };

    const handleConfirmSignUp = async () => {
        if (!email || !confirmationCode) {
            console.error('Email and confirmation code must not be empty');
            return;
        }
    
        try {
            await Auth.confirmSignUp(email, confirmationCode);
            setUserConfirmed(true);
            onSignUpSuccess();
            // Now check if the user is signed in after confirmation
            try {
                const currentUser = await Auth.currentAuthenticatedUser();
                console.log('User is signed in:', currentUser);
                
                // User is signed in, proceed with the flow
            } catch (userError) {
                console.error('User is not signed in:', userError);
                // User is not signed in, handle accordingly (e.g., redirect to sign-in page)
            }
        } catch (error) {
            console.error('error confirming sign up', error);
            // Handle confirmation error
        }
    };
    
    

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setEmailError('')} // Clear error when the user starts typing
                        error={emailError.length > 0}
                        helperText={emailError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError.length > 0}
                        helperText={passwordError}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Sign Up
            </Button>
            {hasSignedUp && !userConfirmed && (
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="confirmationCode"
                            label="Confirmation Code"
                            type="text"
                            id="confirmationCode"
                            value={confirmationCode}
                            onChange={handleConfirmationCodeChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            onClick={handleConfirmSignUp}
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirm Email
                        </Button>
                    </Grid>
                </Grid>
            )}
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </form>
    );
};

export default SignUpModal;

