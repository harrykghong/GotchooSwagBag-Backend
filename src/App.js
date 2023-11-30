// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainConferenceBanner from './ConferenceBanner'
import Sponsors from './sponsorBanner';
import PhysicalGifts from './physicalGifts';
import DigitalGifts from './digitalGifts';
import { AuthProvider } from './authContext';



const defaultTheme = createTheme();


const App = () => {
  const [conference, setConferences] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [physicalG, setGifts] = useState([]);
  const [digitalG, setdigitalGifts] = useState([]); //fetch digital gift here, change line 59 as well
  
  useEffect(() => {
    const fetchSponsors = async () => {
      const response = await fetch('http://gcdm2.crhcg4x4v37c.us-west-1.rds.amazonaws.com:3306/sponsors');
      const data = await response.json();
      setSponsors(data);
    };
    const fetchGifts = async () => {
      const response = await fetch('http://gcdm2.crhcg4x4v37c.us-west-1.rds.amazonaws.com:3306/physicalgifts');
      const data = await response.json();
      setGifts(data);
    };

    const fetchdigitalGifts = async () => {
      const response = await fetch('http://gcdm2.crhcg4x4v37c.us-west-1.rds.amazonaws.com:3306/digitalgifts');
      const data = await response.json();
      setdigitalGifts(data);
    };
    const fetchConferences = async () => {
      const response = await fetch('http://gcdm2.crhcg4x4v37c.us-west-1.rds.amazonaws.com:3306/host');
      const data = await response.json();
      setConferences(data[0]);
    }; 

    fetchConferences();
    fetchSponsors();
    fetchGifts();
    fetchdigitalGifts();
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <style>
        {`
          body {
            background-color: #0A2647;
          }
        `}
      </style>
      <Container maxWidth = "xl" >
        <MainConferenceBanner conference={conference}/>
        {/* <Header conference={conference}/> */}
        <Sponsors sponsors={sponsors} />
        <AuthProvider>
          <PhysicalGifts gifts={physicalG} />
          <DigitalGifts gifts={digitalG}/>
        </AuthProvider>
        
        {/*<ShippingInfo />*/}
        
      </Container>
    </ThemeProvider>
  );
};


// const ShippingInfo = () => (
//   <Grid container className="shipping-info" sx={{ borderRadius: '8px' , flexDirection: 'column', padding: '16px' }}>
//     <Typography variant="h6" component="h6">Enter your shipping info to receive your gifts delivered to your home!</Typography>

//     {/* <p>Enter your shipping info to receive your gifts delivered to your home!</p> */}
//     <button size="large">Shipping Information</button>
//   </Grid>
// );

export default App;
