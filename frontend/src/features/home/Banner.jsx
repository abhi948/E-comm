// import React, { useEffect, useState } from "react";
// import { Box, Container, Typography } from "@mui/material";
// import bn from "./../../assets/images/bn2.jpg";
// import Banner1 from "./../../assets/images/Homebanner1.jpg";
// import Banner2 from "./../../assets/images/Homebanner2.jpg";
// import Banner3 from "./../../assets/images/Homebanner3.jpg";
// import Banner4 from "./../../assets/images/Homebanner4.jpg";
// import Banner5 from "./../../assets/images/Homebanner5.jpg";
// import Banner6 from "./../../assets/images/Homebanner6.jpg";

// function Banner() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const images = [Banner1, Banner2, Banner3, Banner4, Banner6, Banner5];

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
//     }, 3000);

//     return () => clearInterval(intervalId);
//   }, []);

//   return (
//     <Container maxWidth="xl" sx={{ mt: 10, textAlign: "center" }}>
//       <Box component="a" href="/product" sx={{ display: "block" }}>
//         <Box component="img" src={images[currentSlide]} alt="Banner" sx={{ width: "100%", height: "auto" }} />
//       </Box>
//       <Typography variant="h6" fontWeight={600} sx={{ mt: 2 }}>Shop with us</Typography>
//       <Box component="img" src={bn} alt="banner" sx={{ width: "100%", mt: 2 }} />
//     </Container>
//   );
// }

// export default Banner;


"use client"

import { useEffect, useState } from "react"
import { Box, Container, useMediaQuery, useTheme } from "@mui/material"
import { ProductBanner } from "../products/components/ProductBanner"
import { Link } from 'react-router-dom';

import banner1 from "./../../assets/images/Homebanner1.jpg";
import banner2 from "./../../assets/images/Homebanner2.jpg";
import banner3 from "./../../assets/images/Homebanner3.jpg";
import banner4 from "./../../assets/images/Homebanner4.jpg";
import banner5 from "./../../assets/images/Homebanner5.jpg";
import banner6 from "./../../assets/images/Homebanner6.jpg";

const bannerImages = [banner1, banner3, banner2, banner4, banner5, banner6]

export const Banner = () => {
  const theme = useTheme()
  const is600 = useMediaQuery(theme.breakpoints.down(600))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        // minHeight: "vh",
        pt: 4,
      }}
    >

      <Container href="/product" maxWidth="lg">
        {!is600 && (
          <Link to="/product" >
            <Box href="/product" mb={4}>
              <ProductBanner images={bannerImages} />
            </Box>
          </Link>
        )}
      </Container>
    </Box>
  )
}

export default Banner
