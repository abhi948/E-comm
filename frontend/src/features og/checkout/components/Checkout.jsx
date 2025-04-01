"use client"

import React, { useEffect, useState } from "react"
import {
  Stack,
  TextField,
  Typography,
  Button,
  Radio,
  Paper,
  IconButton,
  Box,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material"
import { LoadingButton } from "@mui/lab"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { motion } from "framer-motion"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Cart } from "../../cart/components/Cart"
import {
  addAddressAsync,
  selectAddressStatus,
  selectAddresses,
} from "../../address/AddressSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice"
import {
  createOrderAsync,
  selectOrderStatus,
  selectCurrentOrder,
} from "../../order/OrderSlice"
import {
  resetCartByUserIdAsync,
  selectCartItems,
} from "../../cart/CartSlice"
import { SHIPPING, TAXES } from "../../../constants"

export const Checkout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme()
  const is900 = useMediaQuery(theme.breakpoints.down(900))
  const is480 = useMediaQuery(theme.breakpoints.down(480))

  const addresses = useSelector(selectAddresses)
  const addressStatus = useSelector(selectAddressStatus)
  const loggedInUser = useSelector(selectLoggedInUser)
  const cartItems = useSelector(selectCartItems)
  const orderStatus = useSelector(selectOrderStatus)
  const currentOrder = useSelector(selectCurrentOrder)

  // Initialize form handling with react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Set the selected address; update when addresses change
  const [selectedAddress, setSelectedAddress] = useState(addresses[0] || null)
  useEffect(() => {
    if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[0])
    }
  }, [addresses])

  // Payment method state; default to Cash on Delivery (COD)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("COD")

  // Calculate order total from cart items
  const orderTotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  // Reset form on successful address addition; show alert on failure
  useEffect(() => {
    if (addressStatus === "fulfilled") {
      reset()
    } else if (addressStatus === "rejected") {
      alert("Error adding your address")
    }
  }, [addressStatus, reset])

  // On successful order creation, reset the cart and navigate to order success
  useEffect(() => {
    if (currentOrder && currentOrder._id) {
      dispatch(resetCartByUserIdAsync(loggedInUser?._id))
      navigate(`/order-success/${currentOrder._id}`)
    }
  }, [currentOrder, dispatch, loggedInUser, navigate])

  // Handle submission of the new address form
  const handleAddAddress = (data) => {
    const address = { ...data, user: loggedInUser._id }
    dispatch(addAddressAsync(address))
  }

  // Handle order creation: dispatch order with user, cart items, selected address,
  // payment mode, and total (including shipping and taxes)
  const handleCreateOrder = () => {
    const order = {
      user: loggedInUser._id,
      items: cartItems,
      address: selectedAddress,
      paymentMode: selectedPaymentMethod,
      total: orderTotal + SHIPPING + TAXES,
    }
    dispatch(createOrderAsync(order))
  }

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={4}
      p={2}
      mt={2}
      mb={6}
      alignItems="flex-start"
      justifyContent="center"
    >
      {/* Left Box: Shipping & Payment Information */}
      <Stack spacing={4} flex={1}>
        {/* Heading with Back Button */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <motion.div whileHover={{ x: -5 }}>
            <IconButton component={Link} to="/cart">
              <ArrowBackIcon fontSize={is480 ? "medium" : "large"} />
            </IconButton>
          </motion.div>
          <Typography variant="h4">Shipping Information</Typography>
        </Stack>

        {/* New Address Form */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
          <form onSubmit={handleSubmit(handleAddAddress)} noValidate>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" mb={0.5}>
                  Type
                </Typography>
                <TextField
                  placeholder="e.g., Home, Business"
                  fullWidth
                  {...register("type", { required: true })}
                />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={0.5}>
                  Street
                </Typography>
                <TextField fullWidth {...register("street", { required: true })} />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={0.5}>
                  Country
                </Typography>
                <TextField fullWidth {...register("country", { required: true })} />
              </Box>
              <Box>
                <Typography variant="subtitle2" mb={0.5}>
                  Phone Number
                </Typography>
                <TextField
                  type="number"
                  fullWidth
                  {...register("phoneNumber", { required: true })}
                />
              </Box>
              <Stack direction="row" spacing={2}>
                <Box flex={1}>
                  <Typography variant="subtitle2" mb={0.5}>
                    City
                  </Typography>
                  <TextField fullWidth {...register("city", { required: true })} />
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" mb={0.5}>
                    State
                  </Typography>
                  <TextField fullWidth {...register("state", { required: true })} />
                </Box>
                <Box flex={1}>
                  <Typography variant="subtitle2" mb={0.5}>
                    Postal Code
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    {...register("postalCode", { required: true })}
                  />
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <LoadingButton
                  loading={addressStatus === "pending"}
                  type="submit"
                  variant="contained"
                >
                  Add Address
                </LoadingButton>
                <Button color="error" variant="outlined" onClick={() => reset()}>
                  Reset
                </Button>
              </Stack>
            </Stack>
          </form>
        </Paper>

        {/* Existing Addresses */}
        <Stack spacing={3}>
          <Typography variant="h6">Address</Typography>
          <Typography variant="body2" color="text.secondary">
            Choose from existing addresses
          </Typography>
          <Grid container spacing={2}>
            {addresses.map((address) => (
              <Grid item xs={12} sm={6} md={4} key={address._id}>
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    cursor: "pointer",
                    border:
                      selectedAddress && selectedAddress._id === address._id
                        ? `2px solid ${theme.palette.primary.main}`
                        : "1px solid #ccc",
                    borderRadius: 2,
                  }}
                  onClick={() => setSelectedAddress(address)}
                >
                  <Stack spacing={1}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Radio
                        checked={selectedAddress && selectedAddress._id === address._id}
                        onChange={() => setSelectedAddress(address)}
                      />
                      <Typography variant="body1">{address.type}</Typography>
                    </Stack>
                    <Typography variant="body2">{address.street}</Typography>
                    <Typography variant="body2">
                      {address.state}, {address.city}, {address.country}, {address.postalCode}
                    </Typography>
                    <Typography variant="body2">{address.phoneNumber}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>

        {/* Payment Methods */}
        <Stack spacing={2}>
          <Typography variant="h6">Payment Methods</Typography>
          <Typography variant="body2" color="text.secondary">
            Please select a payment method
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Radio
                checked={selectedPaymentMethod === "COD"}
                onChange={() => setSelectedPaymentMethod("COD")}
              />
              <Typography>Cash on Delivery</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Radio
                checked={selectedPaymentMethod === "CARD"}
                onChange={() => setSelectedPaymentMethod("CARD")}
              />
              <Typography>Credit/Debit Card</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Right Box: Order Summary */}
      <Stack
        width={is900 ? "100%" : "auto"}
        spacing={4}
        alignItems={is900 ? "flex-start" : "center"}
      >
        <Typography variant="h4">Order Summary</Typography>
        <Cart checkout={true} />
        <LoadingButton
          fullWidth
          loading={orderStatus === "pending"}
          variant="contained"
          onClick={handleCreateOrder}
          size="large"
          sx={{
            textTransform: "none",
            borderRadius: 2,
          }}
        >
          Pay and Order
        </LoadingButton>
      </Stack>
    </Stack>
  )
}

export default Checkout
