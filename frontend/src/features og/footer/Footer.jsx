import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { motion } from 'framer-motion';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';
import {
  facebookPng,
  instagramPng,
  twitterPng,
  linkedinPng,
} from '../../assets';

export const Footer = () => {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        position: 'relative',
        py: 6,
        mt: 6,
        // Use a subtle traditional pattern for texture
        backgroundImage: `url('https://www.transparenttextures.com/patterns/arabesque.png')`,
        backgroundSize: 'auto',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      {/* Gradient overlay in Indian heritage colors */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `linear-gradient(135deg, #FF9933, #FFF7E6, #138808)`,
          opacity: 0.15,
          zIndex: 0,
        }}
      />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          {/* About & Cultural Heritage */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.dark }}>
              Shilpkaar
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.primary }}>
              Embracing the legacy of Indian artisans, Shilpkaar celebrates centuries of craftsmanship, vibrant culture, and timeless traditions.
            </Typography>
            <Stack direction="row" spacing={1}>
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={facebookPng}
                alt="Facebook"
                style={{ width: 24, height: 24, cursor: 'pointer' }}
              />
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={twitterPng}
                alt="Twitter"
                style={{ width: 24, height: 24, cursor: 'pointer' }}
              />
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={instagramPng}
                alt="Instagram"
                style={{ width: 24, height: 24, cursor: 'pointer' }}
              />
              <motion.img
                whileHover={{ scale: 1.1 }}
                src={linkedinPng}
                alt="LinkedIn"
                style={{ width: 24, height: 24, cursor: 'pointer' }}
              />
            </Stack>
          </Grid>

          {/* Heritage Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.dark }}>
              Heritage Links
            </Typography>
            <Stack spacing={1}>
              <Link to="/shop" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Artisans</Link>
              <Link to="/about" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Our Story</Link>
              <Link to="/contact" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Contact</Link>
              <Link to="/faq" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>FAQs</Link>
              <Link to="/privacy" style={{ textDecoration: 'none', color: theme.palette.text.primary }}>Privacy Policy</Link>
            </Stack>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.dark }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.primary }}>
              11th Main Street, Dhaka, DH 1515, California
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.primary }}>
              info@shilpkaar.com
            </Typography>
            <Typography variant="body2" sx={{ mt: 1, color: theme.palette.text.primary }}>
              +91-12345-67890
            </Typography>
          </Grid>

          {/* Newsletter Subscription */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: theme.palette.primary.dark }}>
              Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 2, color: theme.palette.text.primary }}>
              Join our cultural journey and receive the latest updates on artisanal crafts and heritage stories.
            </Typography>
            <Stack direction="row" spacing={1}>
              <TextField
                variant="filled"
                placeholder="Your email"
                size="small"
                InputProps={{ disableUnderline: true }}
                sx={{
                  backgroundColor: theme.palette.common.white,
                  borderRadius: 1,
                  flex: 1,
                }}
              />
              <IconButton
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.common.white,
                  '&:hover': { backgroundColor: theme.palette.secondary.dark },
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        {/* Footer Bottom */}
        <Box
          sx={{
            borderTop: `1px solid ${theme.palette.grey[300]}`,
            mt: 4,
            pt: 3,
          }}
        >
          <Typography variant="body2" align="center" sx={{ color: theme.palette.text.primary }}>
            &copy; {new Date().getFullYear()} Shilpkaar. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
