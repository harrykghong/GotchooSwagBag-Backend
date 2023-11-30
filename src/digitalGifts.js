import React, { useState } from 'react';
import { Button } from '@mui/material';
import { Card } from '@mui/material';

import CardActions from '@mui/material/CardActions';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const DigitalGifts = ({ gifts }) => {
  const [openModalIndex, setOpenModalIndex] = useState(null);

  const handleOpenModal = (index) => {
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
    <Grid Container className="gifts" sx={{ borderRadius: '8px' }}>
      <Typography component="h3" variant='h3' color="#0A2647" sx= {{ fontWeight: 'bold'}}>Redeem Everything Online!</Typography>
      <div className='gifts-img'>
        <Container sx={{ py: 8 }} maxWidth="xl">
            <Grid container spacing={4}>
              {gifts.map((gift, index) => (
                <Grid item key={gift.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        pt: '75%',
                      }}
                      image={gift.logo}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2" sx= {{ fontWeight: 'bold'}}>
                        {gift.gift_name}
                      </Typography>
                      <Typography variant="h6" component="h6">
                        {gift.description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button fullWidth variant="outlined" color="primary" onClick={() => handleOpenModal(index)}>
                        Redeem
                      </Button>
                      <Dialog open={openModalIndex === index} onClose={handleCloseModal}>
                        <DialogTitle>Confirmation</DialogTitle>
                        <DialogContent>
                          <p>Are you sure you want to proceed with the redirection?</p>
                          <Button onClick={() => handleRedirect(gift.redeem_link)} variant="contained" color="primary">
                            Yes, Redirect
                          </Button>
                          <Button onClick={handleCloseModal} variant="outlined" color="secondary">
                            Cancel
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
        </Container>
      </div>
    </Grid>
  );
};

export default DigitalGifts;
