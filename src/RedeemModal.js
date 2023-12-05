import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Link from '@mui/material/Link';
import ShippingInfoModal from './ShippingInfoModal';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import { useAuth } from './authContext';




const steps = ['Sign in', 'Sign up', 'Shipping Information'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <SignInModal/>;
        case 1:
            return <SignUpModal/>;
        case 2:
            return <ShippingInfoModal/>;
        default:
            throw new Error('Unknown Step');
    }
}

export default function Redeem({ buttonName }) {
    const [open, setOpen] = React.useState(false);
    const [activeStep, setActiveStep] = React.useState(0);
    const {user, signIn, signOut } = useAuth();

    const handleNext = ()=> {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        // Handle the shipping information, e.g., send it to a server
        console.log('Redeem info:', activeStep);
        setOpen(false);
    };

    return (
        <Grid container className="RedeemModal">
            <Button fullWidth variant="outlined" onClick={handleOpen}>
                {buttonName || 'Redeem'}
            </Button>
            <Grid container className="RedeemModalDialog">
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle variant="h6" gutterBottom>Redeem</DialogTitle>
                    <DialogContent>
                    <Grid container spacing={3}>
                        {/* <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper> */}
                        {activeStep === steps.length ? (
                            <React.Fragment>
                            <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 2, ml:3}}>
                                Thank you for your order.
                            </Typography>
                            <Typography variant="subtitle1" sx={{ mb: 2, ml:3}}>
                                Your order number is #2001539. We have emailed your order
                                confirmation, and will send you an update when your order has
                                shipped.
                            </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                            <Grid item xs={12}>
                                {getStepContent(activeStep)}
                            </Grid>
                            {activeStep == 0 && (
                                    <Grid container sx={{ ml: 2 }}>
                                        <Grid item xs >
                                            <Link href="#" variant="body2">
                                            Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link href="#" variant="body2" onClick={handleNext}>
                                            {"Don't have an account? Sign Up"}
                                            </Link>
                                        </Grid>
                                    </Grid>
                            )}

                            {activeStep == 1 && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, mb: 2, ml:3}}
                                >
                                    Sign Up
                                </Button>
                            )}

                            {activeStep == 2 && (
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 3, mb: 2, ml:3}}
                                >
                                    Place Order
                                </Button>
                            )}
                            
                            
                            {/*<Grid item xs={12}>
                                <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between', // Adjust alignment here
                                    mt: 3,
                                    ml: 1,
                                    mr: 1, // Add right margin for the "Cancel" and "Save" buttons
                                }}
                                >
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack}>
                                    Back
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                >
                                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                </Button>
                                </Box>
                                </Grid>*/}
                            
                            </React.Fragment>
                        )}
                
                    </Grid>
                    </DialogContent>
{/*                    <DialogActions>
                        <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            mt: 2, // Add top margin
                        }}
                        >
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} color="primary">
                            Save
                        </Button>
                        </Box>
                    </DialogActions>*/}
                </Dialog>
            </Grid>
        </Grid>
    );
};