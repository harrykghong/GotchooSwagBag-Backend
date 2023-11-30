import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
import { Paper, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';

const ClickableSponsor = ({ index, imageUrl, altname, redirectUrl }) => {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const handleOpenModal = () => {
    setOpenModalIndex(index);
  };

  const handleCloseModal = () => {
    setOpenModalIndex(null);
  };

  const handleRedirect = (url) => {
    console.log('Redirecting to:', url);
    window.open(url, '_blank');
    handleCloseModal(); // Close the modal after redirection
  };

  return (
    <>
      <Paper 
        onClick={handleOpenModal} 
        elevation={3} 
        style={{ padding: 16, cursor: 'pointer', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', height:'150px' }}
      >
        <img src={imageUrl} alt={`${altname} logo`} style={{ width: 'auto', height: '100px' }} />
      </Paper>

      {/* Popup Modal */}
      <Dialog open={openModalIndex === index} onClose={handleCloseModal}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to proceed with the redirection?</p>
          <Button onClick={() => handleRedirect(redirectUrl)} variant="contained" color="primary">
            Yes, Redirect
          </Button>
          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

const Sponsors = ({ sponsors }) => (
  <Grid Container className="sponsors" sx={{ borderRadius: '8px' }}>
    <Typography component="h2" variant='h2' color="#0A2647" sx= {{fontWeight: 'bold'}}>Our Sponsors</Typography>
    <Container sx={{ py: 4 }} maxWidth="xl">
      <Grid container spacing={4} className="sponsor-logos" justifyContent="center">
        {sponsors.map((sponsor, index) => (
          <Grid item key={sponsor.id} className="sponsor-logo-container" xs={12} sm={6} md={4} lg={2}>
            <ClickableSponsor index = {index} imageUrl={sponsor.logo} alt={`${sponsor.name} logo`} redirectUrl={sponsor.website_link} />
          </Grid>
        ))}
      </Grid>
    </Container>
  </Grid>
);

export default Sponsors;
