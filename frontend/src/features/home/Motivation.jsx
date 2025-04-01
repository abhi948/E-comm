import React, { useEffect, useState } from "react";
import { Container, Typography, CardMedia, Grid, useMediaQuery,useTheme } from "@mui/material";
import local from "./../../assets/images/local.png";
import mt2 from "./../../assets/images/WB.jpg";
import bn2 from "./../../assets/images/bn2.jpg";



function Motivation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const images = [
    { url: local, label: "Become the helping hands to the Local artisans..." },
    { url: mt2, label: "BE Vocal for local..." },
  ];

    const theme = useTheme()
  const is600 = useMediaQuery(theme.breakpoints.down(600))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container
    sx={{
        backgroundColor: theme.palette.background.paper,
        // minHeight: "vh",
        pt: 4,
      }}
    >
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} md={6}>
          <CardMedia component="img" image={images[currentSlide].url} alt="img" sx={{ width: "100%" }} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" align="center" color="textSecondary">
            {images[currentSlide].label}
          </Typography>
        </Grid>
      </Grid>
        <Grid item xs={12} md={6} pt={4}>
          <CardMedia component="img" image={bn2} alt="img" sx={{ width: "100%" }} />
        </Grid>
    </Container>
  );
}

export default Motivation
