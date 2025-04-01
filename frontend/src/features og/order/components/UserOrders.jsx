import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getOrderByUserIdAsync,
  resetOrderFetchStatus,
  selectOrderFetchStatus,
  selectOrders,
} from "../OrderSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice"
import {
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Box,
} from "@mui/material"
import { Link } from "react-router-dom"
import {
  addToCartAsync,
  resetCartItemAddStatus,
  selectCartItemAddStatus,
  selectCartItems,
} from "../../cart/CartSlice"
import Lottie from "lottie-react"
import { loadingAnimation, noOrdersAnimation } from "../../../assets"
import { toast } from "react-toastify"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { motion } from "framer-motion"

export const UserOrders = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(selectLoggedInUser)
  const orders = useSelector(selectOrders)
  const cartItems = useSelector(selectCartItems)
  const orderFetchStatus = useSelector(selectOrderFetchStatus)
  const cartItemAddStatus = useSelector(selectCartItemAddStatus)

  const theme = useTheme()
  const is1200 = useMediaQuery(theme.breakpoints.down("1200"))
  const is768 = useMediaQuery(theme.breakpoints.down("768"))
  const is660 = useMediaQuery(theme.breakpoints.down("660"))
  const is480 = useMediaQuery(theme.breakpoints.down("480"))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [])

  useEffect(() => {
    dispatch(getOrderByUserIdAsync(loggedInUser?._id))
  }, [dispatch, loggedInUser])

  useEffect(() => {
    if (cartItemAddStatus === "fulfilled") {
      toast.success("Product added to cart")
    } else if (cartItemAddStatus === "rejected") {
      toast.error("Error adding product to cart, please try again later")
    }
  }, [cartItemAddStatus])

  useEffect(() => {
    if (orderFetchStatus === "rejected") {
      toast.error("Error fetching orders, please try again later")
    }
  }, [orderFetchStatus])

  useEffect(() => {
    return () => {
      dispatch(resetOrderFetchStatus())
      dispatch(resetCartItemAddStatus())
    }
  }, [dispatch])

  const handleAddToCart = (product) => {
    const item = { user: loggedInUser._id, product: product._id, quantity: 1 }
    dispatch(addToCartAsync(item))
  }

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ py: 4 }}>
      {orderFetchStatus === "pending" ? (
        <Stack
          width={is480 ? "auto" : "25rem"}
          height="calc(100vh - 4rem)"
          justifyContent="center"
          alignItems="center"
        >
          <Lottie animationData={loadingAnimation} />
        </Stack>
      ) : (
        <Stack width={is1200 ? "auto" : "60rem"} p={is480 ? 2 : 4} mb="5rem" spacing={4}>
          {/* Header & Navigation */}
          <Stack direction="row" spacing={2} alignItems="center">
            {!is480 && (
              <motion.div whileHover={{ x: -5 }}>
                <IconButton component={Link} to="/">
                  <ArrowBackIcon fontSize="large" />
                </IconButton>
              </motion.div>
            )}
            <Stack spacing={1}>
              <Typography variant="h4" fontWeight={500}>
                Order History
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check the status of your recent orders, manage returns, and explore similar products.
              </Typography>
            </Stack>
          </Stack>

          {/* Orders List */}
          <Stack spacing={5}>
            {orders && orders.length > 0 ? (
              orders.map((order) => (
                <Paper
                  key={order._id}
                  elevation={2}
                  sx={{ p: 3, borderRadius: 2 }}
                >
                  {/* Order Header */}
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                    spacing={2}
                    mb={2}
                  >
                    <Stack direction="row" spacing={4} flexWrap="wrap">
                      <Stack>
                        <Typography variant="subtitle2">Order Number</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {order._id}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="subtitle2">Date Placed</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(order.createdAt).toDateString()}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography variant="subtitle2">Total Amount</Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${order.total}
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box>
                      <Typography variant="subtitle2">
                        Items: {order.item.length}
                      </Typography>
                    </Box>
                  </Stack>

                  <Divider sx={{ mb: 2 }} />

                  {/* Order Items */}
                  <Stack spacing={3}>
                    {order.item.map((product) => (
                      <Stack
                        key={product.product._id}
                        direction={is768 ? "column" : "row"}
                        spacing={is768 ? 2 : 4}
                        alignItems="center"
                        sx={{ borderBottom: "1px solid", borderColor: "divider", pb: 2 }}
                      >
                        <Box
                          component="img"
                          src={product.product.images[0]}
                          alt={product.product.title}
                          sx={{
                            width: is480 ? "100%" : 120,
                            height: is480 ? "auto" : 120,
                            objectFit: "contain",
                          }}
                        />
                        <Stack spacing={1} flex={1}>
                          <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack spacing={0.5}>
                              <Typography variant="subtitle1" fontWeight={500}>
                                {product.product.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {product.product.brand.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Qty: {product.quantity}
                              </Typography>
                            </Stack>
                            <Typography variant="subtitle1" fontWeight={500}>
                              ${product.product.price}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {product.product.description}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            mt={1}
                            justifyContent={is480 ? "flex-start" : "flex-end"}
                          >
                            <Button
                              size="small"
                              component={Link}
                              to={`/product-details/${product.product._id}`}
                              variant="outlined"
                            >
                              View Product
                            </Button>
                            {cartItems.some(
                              (cartItem) => cartItem.product._id === product.product._id
                            ) ? (
                              <Button
                                size="small"
                                variant="contained"
                                component={Link}
                                to="/cart"
                              >
                                In Cart
                              </Button>
                            ) : (
                              <Button
                                size="small"
                                variant="contained"
                                onClick={() => handleAddToCart(product.product)}
                              >
                                Buy Again
                              </Button>
                            )}
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Stack>

                  {/* Order Status */}
                  <Stack mt={2}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Status: {order.status}
                    </Typography>
                  </Stack>
                </Paper>
              ))
            ) : (
              // No orders animation & message
              <Stack
                mt={is480 ? 2 : 0}
                mb="7rem"
                alignItems="center"
                spacing={2}
              >
                <Box
                  sx={{
                    width: is660 ? "auto" : "30rem",
                    height: is660 ? "auto" : "30rem",
                  }}
                >
                  <Lottie animationData={noOrdersAnimation} />
                </Box>
                <Typography variant="h6" align="center">
                  Oh! Looks like you haven't been shopping lately.
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

export default UserOrders
