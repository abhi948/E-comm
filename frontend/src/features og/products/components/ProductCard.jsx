import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
} from "@mui/material"
import { Favorite, FavoriteBorder, ShoppingCart } from "@mui/icons-material"
import { selectWishlistItems } from "../../wishlist/WishlistSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice"
import { addToCartAsync, selectCartItems } from "../../cart/CartSlice"

export const ProductCard = ({
  id,
  title,
  price,
  thumbnail,
  brand,
  handleAddRemoveFromWishlist,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = useTheme()

  const wishlistItems = useSelector(selectWishlistItems)
  const loggedInUser = useSelector(selectLoggedInUser)
  const cartItems = useSelector(selectCartItems)

  const isProductAlreadyInWishlist = wishlistItems.some(
    (item) => item.product._id === id
  )
  const isProductAlreadyInCart = cartItems.some(
    (item) => item.product._id === id
  )

  const handleAddToCart = (e) => {
    e.stopPropagation()
    dispatch(addToCartAsync({ user: loggedInUser?._id, product: id }))
  }

  return (
    <motion.div whileHover={{ scale: 1.03, y: -5 }} transition={{ duration: 0.3 }}>
      <Card
        onClick={() => navigate(`/product-details/${id}`)}
        sx={{
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: theme.shape.borderRadius,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          transition: "box-shadow 0.3s ease, transform 0.3s ease",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
          },
          overflow: "hidden",
          background: "#fff",
          border: "1px solid transparent",
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={thumbnail}
          alt={title}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: theme.shape.borderRadius,
            borderTopRightRadius: theme.shape.borderRadius,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
            },
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            p: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ color: theme.palette.primary.main, fontWeight: 600, mb: 0.5 }}
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {brand}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ₹{price}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              variant="contained"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
              disabled={isProductAlreadyInCart}
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: theme.palette.secondary.dark,
                  boxShadow: "none",
                },
                borderRadius: 2,
                px: 2,
              }}
            >
              {isProductAlreadyInCart ? "In Cart" : "Add to Cart"}
            </Button>
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                handleAddRemoveFromWishlist(e, id)
              }}
              sx={{
                p: 1,
                border: "1px solid",
                borderColor: isProductAlreadyInWishlist
                  ? theme.palette.error.main
                  : "transparent",
                borderRadius: "50%",
                transition: "border-color 0.3s ease",
              }}
              color={isProductAlreadyInWishlist ? "error" : "default"}
            >
              {isProductAlreadyInWishlist ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  )
}
