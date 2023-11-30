import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function MainConferenceBanner({ conference }) {
  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#F6F4EB',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${conference.picture_link})`,
      }}
    >
      <img style={{ display: 'none' }} src={conference.picture_link} alt={conference.conference_name} />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={9}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 1 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom sx={{ fontSize: '5rem', fontWeight: 'bold' }}>
              {conference.Event_Name}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {conference.description}
            </Typography>
          </Box>
        </Grid>
        <Grid item md={3}>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              p: { xs: 3, md: 6 },
            }}
          >
            <Typography variant="subtitle1" color="inherit" paragraph sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#000'}}>
              Powered by 
              <img 
                src="https://drive.google.com/uc?export=view&id=1cahLiYYIJydTUWQskXLjXL63W4pkW5be" 
                alt="Gotchoo logo" 
                width="50" 
                height="auto" 
                style={{ marginLeft: '5px' }} // Optional: Add a bit of spacing between the text and the image.
              />
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainConferenceBanner.propTypes = {
  conference: PropTypes.shape({
    description: PropTypes.string.isRequired,
    picture_link: PropTypes.string.isRequired,
    conference_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MainConferenceBanner;
