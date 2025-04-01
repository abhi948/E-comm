import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import BannerX from "./../../assets/images/Bannerx.jpg";
import Artisan1 from "./../../assets/images/artisan1.jpeg";
import Artisan2 from "./../../assets/images/artisan2.jpeg";

function About() {
  return (
    <Container maxWidth="xl" sx={{ mt: 12 }}>
      <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 600, letterSpacing: 2, mt: 6 }}>
        About Us
      </Typography>

      {/* Section 1 */}
      <Grid container spacing={5} alignItems="center" sx={{ mt: 5 }}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={BannerX} alt="Banner" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', px: 3 }}>
            Our mission is to empower artisans worldwide by providing them with a platform to showcase and sell their unique creations.
            We believe that every piece of handcrafted art tells a story, and we're dedicated to connecting these talented individuals with a global audience.
            By supporting artisans and promoting sustainable practices, we aim to preserve cultural heritage and create a more equitable marketplace.
            Join us in celebrating the beauty and diversity of handmade goods.
          </Typography>
        </Grid>
      </Grid>

      {/* Section 2 */}
      <Grid container spacing={5} alignItems="center" sx={{ mt: 8 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', px: 3 }}>
            Our journey began with a simple dream: to create a world where artisans could thrive and share their passions without boundaries.
            Inspired by the countless stories of talented individuals whose creations have touched hearts and transformed lives, we set out to build a platform that would empower these visionaries.
            From the bustling markets of ancient civilizations to the modern-day workshops of innovative minds, we've witnessed the power of handmade art to connect people, inspire cultures, and enrich our lives.
            Join us on this inspiring mission as we celebrate the artistry, innovation, and spirit of the makers who shape our world.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="img" src={BannerX} alt="Banner" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Grid>
      </Grid>

      {/* Section 3 */}
      <Grid container spacing={5} alignItems="center" justifyContent="center" sx={{ mt: 8 }}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={Artisan1} alt="Artisan 1" sx={{ width: '100%', objectFit: 'cover' }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box component="img" src={Artisan2} alt="Artisan 2" sx={{ width: '100%', objectFit: 'cover' }} />
        </Grid>
      </Grid>

      <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', mt: 6 }}>
        "Every purchase from a local artisan is a vote for a better future..."
      </Typography>
    </Container>
  );
}

export default About;
