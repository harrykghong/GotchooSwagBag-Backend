import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// import ShippingInfoModal from './ShippingInfoModal';
import Redeem from './RedeemModal';


const PhysicalGifts = ({ gifts }) => (
  <Grid Container className="gifts" sx={{ borderRadius: '8px' }}>
    <Typography component="h3" variant='h3' color="#0A2647" sx= {{ fontWeight: 'bold'}}>Your gifts from our amazing sponsors!</Typography>
    <Typography component="subtitle1" variant='subtitle1' color="#0A2647">Select ONE physical gifts from the following</Typography>
    <div className='gifts-img'>
      <Container sx={{ py: 8 }} maxWidth="xl">
          <Grid container spacing={4}>
            {gifts.map((gift) => (
              <Grid item key={gift.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column'}}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '100%',
                    }}
                    image={gift.logo}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h5" sx= {{ fontWeight: 'bold'}}>
                      {gift.gift_name}
                    </Typography>
                    <Typography variant="h6" component="h6"> 
                      {gift.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Redeem buttonName='Select One'/>
                  </CardActions>
                </Card>
              </Grid>
        
          ))}
        </Grid>
      </Container>
    </div>
  </Grid>
);

export default PhysicalGifts;