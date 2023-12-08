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
import { API, Auth } from "aws-amplify";



const defaultTheme = createTheme();
const testapi = async () => {
  const apiName = "gotchooSwagBagAPI";
  const mainPath = "/swagbag"
  const subPath = '/host';
  const path = mainPath + subPath;
  try {
    const result = await API.get(apiName, path, {});
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

const App = () => {
  const [conference, setConferences] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [physicalG, setGifts] = useState([]);
  const [digitalG, setdigitalGifts] = useState([]);

  useEffect(() => {
    const fetchData = async (path) => {
      try {
        const apiName = "gotchooSwagBagAPI";
        const result = await API.get(apiName, path, {});
        return result;
      } catch (error) {
        console.error("Error fetching data from API", error);
      }
    };

    const fetchSponsors = async () => {
      const data = await fetchData("/swagbag/sponsors");
      setSponsors(data);
    };
    const fetchGifts = async () => {
      const data = await fetchData("/swagbag/physicalgifts");
      setGifts(data);
    };
    const fetchdigitalGifts = async () => {
      const data = await fetchData("/swagbag/digitalgifts");
      setdigitalGifts(data);
    };
    const fetchConferences = async () => {
      // const response = await fetch('http://localhost:5001/host');
      // const data = await response.json();
      // setConferences(data[0]);

      const apiName = "gotchooSwagBagAPI";
      const mainPath = "/swagbag"
      const subPath = '/host';
      const path = mainPath + subPath;
      const result = await API.get(apiName, path, {});
      console.log(result);
      setConferences(result);
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
      <Container maxWidth="xl" >
        <MainConferenceBanner conference={conference} />
        {/* <Header conference={conference}/> */}
        <Sponsors sponsors={sponsors} />
        <AuthProvider>
          <PhysicalGifts gifts={physicalG} />
          <DigitalGifts gifts={digitalG} />
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
