// 

import React from "react";
import { Container, Typography, Card, CardMedia, CardContent, Grid, Box } from "@mui/material";
import AP from "./../../assets/images/AndhraPradesh.png";
import Gujrat from "./../../assets/images/Gujrat.jpg";
import Jharkhand from "./../../assets/images/Jharkhand.jpeg";
import WB from "./../../assets/images/WB.jpg";
import { Link } from "react-router-dom";

// Sample data for newly arrived items (replace with your actual data)
const newArrivals = [
  { url: AP, label: "New Andhra Pradesh Craft" },
  { url: Gujrat, label: "New Gujarat Art" },
  { url: Jharkhand, label: "New Jharkhand Sculpture" },
  { url: WB, label: "New West Bengal Pottery" },
];

function HomeComp() {
  const imageData = [
    { url: AP, label: "Handmade Crafts" },
    { url: Gujrat, label: "Traditional Art" },
    { url: Jharkhand, label: "Sculptures" },
    { url: WB, label: "Pottery" },
  ];

  return (
    <Container>
      {/* Newly Arrived Section */}
      <Box sx={{ mt: 4 }}> {/* Add some spacing top and bottom */}
        <Typography variant="h5" align="center" fontWeight="bold" sx={{ mb: 2 }}>
          Newly Arrived
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {newArrivals.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Link to={'/product'}>
                <Card>
                  <CardMedia component="img" image={item.url} alt={item.label} sx={{ height: 200 }} />
                  <CardContent>
                    <Typography align="center">{item.label}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Collections Section */}
      <Box sx={{ mt: 4 }}> {/* Add some spacing top and bottom */}
        <Typography variant="h5" align="center" fontWeight="bold" sx={{ mb: 2 }}>
          Collections
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {imageData.map((item, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <Link to={'/product'}>
                <Card>
                  <CardMedia component="img" image={item.url} alt={item.label} sx={{ height: 200 }} />
                  <CardContent>
                    <Typography align="center">{item.label}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default HomeComp;