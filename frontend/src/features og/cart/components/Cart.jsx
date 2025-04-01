"use client"

import { useEffect } from "react"
import { CartItem } from "./CartItem"
import {
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Box,
} from "@mui/material"
import {
  resetCartItemRemoveStatus,
  selectCartItemRemoveStatus,
  selectCartItems,
} from "../CartSlice"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { SHIPPING, TAXES } from "../../../constants"
import { toast } from "react-toastify"
import { motion } from "framer-motion"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import LocalShippingIcon from "@mui/icons-material/LocalShipping"
import ReceiptIcon from "@mui/icons-material/Receipt"

export const Cart = ({ checkout }) => {
  const items = useSelector(selectCartItems)
  const cartItemRemoveStatus = useSelector(selectCartItemRemoveStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const is900 = useMediaQuery(theme.breakpoints.down(900))

  // Calculate totals
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0)

  // Effects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    if (items.length === 0) {
      navigate("/")
    }
  }, [items, navigate])

  useEffect(() => {
    if (cartItemRemoveStatus === "fulfilled") {
      toast.success("Product removed from cart")
    } else if (cartItemRemoveStatus === "rejected") {
      toast.error("Error removing product from cart, please try again later")
    }
  }, [cartItemRemoveStatus])

  useEffect(() => {
    return () => {
      dispatch(resetCartItemRemoveStatus())
    }
  }, [dispatch])

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Stack justifyContent="flex-start" alignItems="center" mb={6}>
        <Paper
          elevation={3}
          sx={{
            width: is900 ? "90%" : "60rem",
            p: 4,
            borderRadius: "16px",
            background: theme.palette.background.paper,
            border: `1px solid ${theme.palette.primary.light}`,
          }}
        >
          <Typography variant="h4" textAlign="center" mb={4} color="primary.main">
            Your Artisan Cart
          </Typography>

          <Divider
            sx={{
              mb: 4,
              "&::before, &::after": { borderColor: theme.palette.primary.light },
            }}
          >
            <Chip label={`${totalItems} item${totalItems > 1 ? "s" : ""}`} color="primary" />
          </Divider>

          {/* Cart Items List */}
          <Stack spacing={3} mb={4}>
            {items.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                title={item.product.title}
                brand={item.product.brand.name}
                category={item.product.category.name}
                price={item.product.price}
                quantity={item.quantity}
                thumbnail={item.product.thumbnail}
                stockQuantity={item.product.stockQuantity}
                productId={item.product._id}
              />
            ))}
          </Stack>

          {/* Subtotal & Price Details */}
          <Paper
            elevation={1}
            sx={{
              p: 3,
              borderRadius: "8px",
              background: theme.palette.background.default,
              mb: 3,
            }}
          >
            {checkout ? (
              <Stack spacing={2}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">
                    <ShoppingCartIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Subtotal
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ${subtotal.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">
                    <LocalShippingIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Shipping
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ${SHIPPING.toFixed(2)}
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body1">
                    <ReceiptIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                    Taxes
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    ${TAXES.toFixed(2)}
                  </Typography>
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5">Total</Typography>
                  <Typography variant="h5" color="primary.main">
                    ${(subtotal + SHIPPING + TAXES).toFixed(2)}
                  </Typography>
                </Stack>
              </Stack>
            ) : (
              <Stack
                direction={is900 ? "column" : "row"}
                justifyContent="space-between"
                alignItems={is900 ? "flex-start" : "center"}
                spacing={2}
              >
                <Stack>
                  <Typography variant="h6" fontWeight={500}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total items in cart: {totalItems}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Shipping and taxes calculated at checkout.
                  </Typography>
                </Stack>
                <Typography variant="h4" fontWeight={500} color="primary.main">
                  ${subtotal.toFixed(2)}
                </Typography>
              </Stack>
            )}
          </Paper>

          {/* Checkout / Continue Shopping Actions */}
          {!checkout && (
            <Stack spacing={2} alignItems="center">
              <Button
                variant="contained"
                component={Link}
                to="/checkout"
                size="large"
                sx={{
                  width: "100%",
                  maxWidth: "400px",
                  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                  color: "white",
                  textTransform: "none",
                  "&:hover": {
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
                  },
                }}
              >
                Proceed to Checkout
              </Button>
              <motion.div whileHover={{ y: 2 }}>
                <Chip
                  component={Link}
                  to="/"
                  label="Continue Shopping"
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
                    borderRadius: "20px",
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                />
              </motion.div>
            </Stack>
          )}
        </Paper>
      </Stack>
    </Box>
  )
}

export default Cart
