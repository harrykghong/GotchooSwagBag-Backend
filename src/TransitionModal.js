import React from 'react';
import { Dialog, DialogContent, DialogTitle, Slide, Button } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TransitionModal = ({ open, onClose, onRedirect }) => {
  return (
    <Dialog open={open} TransitionComponent={Transition} onClose={onClose}>
      <DialogTitle>Alert</DialogTitle>
      <DialogContent>
        <p>You are transition to external website</p>
        <Button onClick={onRedirect} variant="contained" color="primary">
          Redirect
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PopupModal;