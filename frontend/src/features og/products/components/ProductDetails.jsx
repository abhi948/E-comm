"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Rating,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import {
  Favorite,
  FavoriteBorder,
  LocalShipping,
  Loop,
  ShoppingCart,
} from "@mui/icons-material"
import SwipeableViews from "react-swipeable-views"
import { autoPlay } from "react-swipeable-views-utils"
import {
  clearSelectedProduct,
  fetchProductByIdAsync,
  selectSelectedProduct,
} from "../ProductSlice"
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice"
import {
  fetchReviewsByProductIdAsync,
  selectReviews,
} from "../../review/ReviewSlice"
import { Reviews } from "../../review/components/Reviews"
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice"
import { toast } from "react-toastify"
import Lottie from "lottie-react"
import { loadingAnimation } from "../../../assets"

const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

const SIZES = ["XS", "S", "M", "L", "XL"]
const COLORS = ["#FF9933", "#138808", "#000080", "#FFFFFF", "#FFD700"] // Traditional Indian colors

export const ProductDetails = () => {
  const { id } = useParams()
  const theme = useTheme()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const product = useSelector(selectSelectedProduct)
  const loggedInUser = useSelector(selectLoggedInUser)
  const cartItems = useSelector(selectCartItems)
  const wishlistItems = useSelector(selectWishlistItems)
  const reviews = useSelector(selectReviews)

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColorIndex, setSelectedColorIndex] = useState(-1)
  const [activeStep, setActiveStep] = useState(0)

  const isProductAlreadyInCart = cartItems.some((item) => item.product._id === id)
  const isProductAlreadyinWishlist = wishlistItems.some((item) => item.product._id === id)

  const totalReviews = reviews.length
  const averageRating =
    totalReviews > 0
      ? Math.ceil(
          reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews
        )
      : 0

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    dispatch(fetchProductByIdAsync(id))
    dispatch(fetchReviewsByProductIdAsync(id))

    return () => {
      dispatch(clearSelectedProduct())
    }
  }, [id, dispatch])

  const handleAddToCart = () => {
    dispatch(addToCartAsync({ user: loggedInUser._id, product: id, quantity }))
    toast.success("Product added to cart")
  }

  const handleAddRemoveFromWishlist = () => {
    if (isProductAlreadyinWishlist) {
      const item = wishlistItems.find((item) => item.product._id === id)
      dispatch(deleteWishlistItemByIdAsync(item._id))
      toast.success("Product removed from wishlist")
    } else {
      dispatch(createWishlistItemAsync({ user: loggedInUser?._id, product: id }))
      toast.success("Product added to wishlist")
    }
  }

  if (!product) {
    return (
      <Container
        maxWidth="lg"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      >
        <Lottie animationData={loadingAnimation} style={{ width: "200px" }} />
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Paper
        elevation={4}
        sx={{ p: 4, borderRadius: theme.shape.borderRadius, backgroundColor: "#fff" }}
      >
        <Grid container spacing={4}>
          {/* Product Images */}
          <Grid item xs={12} md={6}>
            <AutoPlaySwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={activeStep}
              onChangeIndex={setActiveStep}
              enableMouseEvents
            >
              {product.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    height: 400,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    borderRadius: theme.shape.borderRadius,
                    boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} - ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </Box>
              ))}
            </AutoPlaySwipeableViews>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Stack spacing={2}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, color: theme.palette.primary.main }}
              >
                {product.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.text.secondary }}
              >
                by {product.brand.name}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Rating value={averageRating} readOnly />
                <Typography variant="body2">
                  ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})
                </Typography>
              </Stack>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
              >
                ₹{product.price}
              </Typography>
              <Divider />
              <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                {product.description}
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontStyle: "italic", color: theme.palette.text.secondary }}
              >
                Crafted by {product.artisanName} from {product.region}, India
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary }}
              >
                Made using traditional {product.technique} technique, reflecting the
                rich heritage of Indian craftsmanship.
              </Typography>

              {/* Options Section */}
              <Box>
                {/* Color Selection */}
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Colors:
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {COLORS.map((color, index) => (
                    <Box
                      key={color}
                      onClick={() => setSelectedColorIndex(index)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        backgroundColor: color,
                        border:
                          selectedColorIndex === index
                            ? `2px solid ${theme.palette.primary.main}`
                            : "2px solid transparent",
                        cursor: "pointer",
                        transition: "transform 0.3s",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                      }}
                    />
                  ))}
                </Box>

                {/* Size Selection */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Size:
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {SIZES.map((size) => (
                      <Chip
                        key={size}
                        label={size}
                        onClick={() => setSelectedSize(size)}
                        color={selectedSize === size ? "primary" : "default"}
                        sx={{
                          borderRadius: "16px",
                          transition: "transform 0.3s",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                {/* Quantity Selection */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mr: 2 }}>
                    Quantity:
                  </Typography>
                  <Button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    variant="outlined"
                    size="small"
                  >
                    –
                  </Button>
                  <Typography sx={{ mx: 2 }}>{quantity}</Typography>
                  <Button
                    onClick={() =>
                      setQuantity((prev) => Math.min(product.stockQuantity, prev + 1))
                    }
                    variant="outlined"
                    size="small"
                  >
                    +
                  </Button>
                </Box>
              </Box>

              {/* Actions */}
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCart />}
                  onClick={handleAddToCart}
                  disabled={isProductAlreadyInCart}
                  fullWidth
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  {isProductAlreadyInCart ? "In Cart" : "Add to Cart"}
                </Button>
                <IconButton
                  onClick={handleAddRemoveFromWishlist}
                  color={isProductAlreadyinWishlist ? "error" : "default"}
                  sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: "50%",
                    p: 1.5,
                  }}
                >
                  {isProductAlreadyinWishlist ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </Stack>

              {/* Product Perks */}
              <Paper variant="outlined" sx={{ p: 2, mt: 3 }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
                  <LocalShipping color="action" />
                  <Box>
                    <Typography variant="subtitle2">Free Delivery</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Enter your postal code for delivery availability
                    </Typography>
                  </Box>
                </Stack>
                <Divider sx={{ my: 1 }} />
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Loop color="action" />
                  <Box>
                    <Typography variant="subtitle2">Return Delivery</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Free 30 Days Delivery Returns
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

      {/* Reviews Section */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 4,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: "#fff",
        }}
      >
        <Reviews productId={id} averageRating={averageRating} />
      </Paper>
    </Container>
  )
}

export default ProductDetails
