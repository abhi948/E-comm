import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
  Divider,
  Paper,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectBrands } from "../../brands/BrandSlice";
import { selectCategories } from "../../categories/CategoriesSlice";
import { ProductCard } from "../../products/components/ProductCard";
import {
  deleteProductByIdAsync,
  fetchProductsAsync,
  selectProductIsFilterOpen,
  selectProductTotalResults,
  selectProducts,
  toggleFilters,
  undeleteProductByIdAsync,
} from "../../products/ProductSlice";
import { getAllOrdersAsync, selectOrders } from "../../order/OrderSlice";
import { ITEMS_PER_PAGE } from "../../../constants";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { noOrdersAnimation } from "../../../assets";

// Dummy SalesGraph component (replace with your actual graph)
const SalesGraph = () => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      height: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="h6" color="text.secondary">
      Sales Graph (Placeholder)
    </Typography>
  </Paper>
);

// Dummy CategoryPieChart component (replace with your actual pie chart)
const CategoryPieChart = () => (
  <Paper
    elevation={3}
    sx={{
      p: 2,
      borderRadius: 2,
      height: 300,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Typography variant="h6" color="text.secondary">
      Category Distribution (Placeholder)
    </Typography>
  </Paper>
);

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
];

export const AdminDashBoard = () => {
  // States for filters, sorting, paging
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [page, setPage] = useState(1);

  // Select products and orders from slices
  const products = useSelector(selectProducts);
  const totalResults = useSelector(selectProductTotalResults);
  const orders = useSelector(selectOrders) || [];

  // **Define isProductFilterOpen here**
  const isProductFilterOpen = useSelector(selectProductIsFilterOpen);

  const dispatch = useDispatch();
  const theme = useTheme();

  // Media queries
  const is500 = useMediaQuery(theme.breakpoints.down(500));
  const is1200 = useMediaQuery(theme.breakpoints.down(1200));
  const is800 = useMediaQuery(theme.breakpoints.down(800));
  const is700 = useMediaQuery(theme.breakpoints.down(700));
  const is600 = useMediaQuery(theme.breakpoints.down(600));
  const is488 = useMediaQuery(theme.breakpoints.down(488));
  const is480 = useMediaQuery("(max-width:480px)");
  const is1620 = useMediaQuery("(max-width:1620px)");

  // Get brands and categories from slices
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);

  // Reset page when total results change
  useEffect(() => {
    setPage(1);
  }, [totalResults]);

  // Fetch products based on filters, sort, and page.
  useEffect(() => {
    const finalFilters = { ...filters };
    finalFilters["pagination"] = { page: page, limit: ITEMS_PER_PAGE };
    finalFilters["sort"] = sort;
    dispatch(fetchProductsAsync(finalFilters));
  }, [filters, sort, page, dispatch]);

  // Fetch orders for the dashboard
  useEffect(() => {
    dispatch(getAllOrdersAsync());
  }, [dispatch]);

  // Filter Handlers
  const handleBrandFilters = (e) => {
    const current = new Set(filters.brand || []);
    if (e.target.checked) {
      current.add(e.target.value);
    } else {
      current.delete(e.target.value);
    }
    setFilters({ ...filters, brand: Array.from(current) });
  };

  const handleCategoryFilters = (e) => {
    const current = new Set(filters.category || []);
    if (e.target.checked) {
      current.add(e.target.value);
    } else {
      current.delete(e.target.value);
    }
    setFilters({ ...filters, category: Array.from(current) });
  };

  // Handlers for product deletion/undelete
  const handleProductDelete = (productId) => {
    dispatch(deleteProductByIdAsync(productId));
  };

  const handleProductUnDelete = (productId) => {
    dispatch(undeleteProductByIdAsync(productId));
  };

  const handleFilterClose = () => {
    dispatch(toggleFilters());
  };

  // Dashboard Metrics
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => !p.isDeleted).length;
  const deletedProducts = products.filter((p) => p.isDeleted).length;
  const averagePrice =
    activeProducts > 0
      ? (
          products
            .filter((p) => !p.isDeleted)
            .reduce((sum, p) => sum + p.price, 0) / activeProducts
        ).toFixed(2)
      : 0;

  // Preview Sections: Only 5 products and 5 latest orders
  const previewProducts = products.slice(0, 5);
  const latestOrders = orders.slice(0, 5);

  // Helper for order status Chip styles
  const getStatusColor = (status) => {
    if (status === "Pending") return { bgcolor: "#dfc9f7", color: "#7c59a4" };
    if (status === "Dispatched") return { bgcolor: "#feed80", color: "#927b1e" };
    if (status === "Out for delivery") return { bgcolor: "#AACCFF", color: "#4793AA" };
    if (status === "Delivered") return { bgcolor: "#b3f5ca", color: "#548c6a" };
    if (status === "Cancelled") return { bgcolor: "#fac0c0", color: "#cc6d72" };
    return {};
  };

  return (
    <>
      {/* Filter Panel */}
      <motion.div
        style={{
          position: "fixed",
          backgroundColor: theme.palette.background.paper,
          height: "100vh",
          padding: "1rem",
          overflowY: "scroll",
          width: is500 ? "100vw" : "30rem",
          zIndex: 500,
        }}
        variants={{ show: { left: 0 }, hide: { left: -500 } }}
        initial={"hide"}
        transition={{ ease: "easeInOut", duration: 0.7, type: "spring" }}
        animate={isProductFilterOpen === true ? "show" : "hide"}
      >
        <Stack mb={"5rem"} sx={{ scrollBehavior: "smooth", overflowY: "scroll" }}>
          <Typography variant="h4">New Arrivals</Typography>
          <IconButton
            onClick={handleFilterClose}
            style={{ position: "absolute", top: 15, right: 15 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ClearIcon fontSize="medium" />
            </motion.div>
          </IconButton>
          <Stack rowGap={2} mt={4}>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Totes
            </Typography>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Backpacks
            </Typography>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Travel Bags
            </Typography>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Hip Bags
            </Typography>
            <Typography sx={{ cursor: "pointer" }} variant="body2">
              Laptop Sleeves
            </Typography>
          </Stack>
          {/* Brand Filters */}
          <Stack mt={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="brand-filters"
                id="brand-filters"
              >
                <Typography>Brands</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <FormGroup onChange={handleBrandFilters}>
                  {brands?.map((brand) => (
                    <motion.div
                      key={brand._id}
                      style={{ width: "fit-content" }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FormControlLabel
                        sx={{ ml: 1 }}
                        control={<Checkbox />}
                        label={brand.name}
                        value={brand._id}
                      />
                    </motion.div>
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Stack>
          {/* Category Filters */}
          <Stack mt={2}>
            <Accordion>
              <AccordionSummary
                expandIcon={<AddIcon />}
                aria-controls="category-filters"
                id="category-filters"
              >
                <Typography>Category</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <FormGroup onChange={handleCategoryFilters}>
                  {categories?.map((category) => (
                    <motion.div
                      key={category._id}
                      style={{ width: "fit-content" }}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FormControlLabel
                        sx={{ ml: 1 }}
                        control={<Checkbox />}
                        label={category.name}
                        value={category._id}
                      />
                    </motion.div>
                  ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          </Stack>
        </Stack>
      </motion.div>

      {/* Main Content */}
      <Stack rowGap={5} mt={is600 ? 2 : 5} mb={"3rem"} sx={{ position: "relative", zIndex: 1 }}>
        {/* Dashboard Overview */}
        <Stack mb={4}>
          <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
            Dashboard Overview
          </Typography>
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h6">Total Products</Typography>
                <Typography variant="h4" color={theme.palette.primary.main}>
                  {totalProducts}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h6">Active Products</Typography>
                <Typography variant="h4" color={theme.palette.success.main}>
                  {activeProducts}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h6">Deleted Products</Typography>
                <Typography variant="h4" color={theme.palette.error.main}>
                  {deletedProducts}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={3} sx={{ p: 2, borderRadius: 2, textAlign: "center" }}>
                <Typography variant="h6">Avg. Price</Typography>
                <Typography variant="h4" color={theme.palette.info.main}>
                  ${averagePrice}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Stack>

        {/* Graphs Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <SalesGraph />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryPieChart />
          </Grid>
        </Grid>

        {/* Products Preview Section */}
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main}>
            Latest Products
          </Typography>
          <Stack spacing={2}>
            {previewProducts.map((product) => (
              <Paper key={product._id} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                <ProductCard
                  id={product._id}
                  title={product.title}
                  thumbnail={product.thumbnail}
                  brand={product.brand.name}
                  price={product.price}
                  isAdminCard={true}
                />
                <Stack direction="row" justifyContent="flex-end" spacing={2} mt={1}>
                  <Button component={Link} to={`/admin/product-update/${product._id}`} variant="contained">
                    Update
                  </Button>
                  {product.isDeleted ? (
                    <Button onClick={() => handleProductUnDelete(product._id)} color="error" variant="outlined">
                      Un-delete
                    </Button>
                  ) : (
                    <Button onClick={() => handleProductDelete(product._id)} color="error" variant="outlined">
                      Delete
                    </Button>
                  )}
                </Stack>
              </Paper>
            ))}
          </Stack>
          <Box textAlign="center" mt={2}>
            <Button component={Link} to="/admin/all-products" variant="outlined">
              See All Products
            </Button>
          </Box>
        </Stack>

        {/* Latest Orders Section */}
        <Stack mt={5} mb={3}>
          <Typography variant="h4" fontWeight="bold" color={theme.palette.primary.main} mb={2}>
            Latest Orders
          </Typography>
          {orders.length ? (
            <TableContainer
              sx={{ width: is1620 ? "95vw" : "auto", overflowX: "auto" }}
              component={Paper}
              elevation={2}
            >
              <Table aria-label="orders table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="left">Items</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right">Shipping</TableCell>
                    <TableCell align="right">Payment</TableCell>
                    <TableCell align="right">Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.slice(0, 5).map((order, index) => (
                    <TableRow key={order._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{order._id}</TableCell>
                      <TableCell align="left">
                        {order.item.map((product) => (
                          <Stack key={product.product._id} mt={2} flexDirection="row" alignItems="center" gap={2}>
                            <Avatar src={product.product.thumbnail} alt={product.product.title} />
                            <Typography>{product.product.title}</Typography>
                          </Stack>
                        ))}
                      </TableCell>
                      <TableCell align="right">{order.total}</TableCell>
                      <TableCell align="right">
                        <Stack>
                          <Typography>{order.address[0].street}</Typography>
                          <Typography>{order.address[0].city}</Typography>
                          <Typography>{order.address[0].state}</Typography>
                          <Typography>{order.address[0].postalCode}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell align="right">{order.paymentMode}</TableCell>
                      <TableCell align="right">{new Date(order.createdAt).toDateString()}</TableCell>
                      <TableCell align="right">
                        <Chip
                          label={order.status}
                          sx={(() => {
                            if (order.status === "Pending")
                              return { bgcolor: "#dfc9f7", color: "#7c59a4" };
                            if (order.status === "Dispatched")
                              return { bgcolor: "#feed80", color: "#927b1e" };
                            if (order.status === "Out for delivery")
                              return { bgcolor: "#AACCFF", color: "#4793AA" };
                            if (order.status === "Delivered")
                              return { bgcolor: "#b3f5ca", color: "#548c6a" };
                            if (order.status === "Cancelled")
                              return { bgcolor: "#fac0c0", color: "#cc6d72" };
                            return {};
                          })()}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => console.log("Edit order:", order._id)}>
                          <EditOutlinedIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Stack width={is480 ? "auto" : "30rem"} justifyContent="center">
              <Stack rowGap={"1rem"}>
                <Lottie animationData={noOrdersAnimation} style={{ width: "200px" }} />
                <Typography textAlign="center" alignSelf="center" variant="h6" fontWeight={400}>
                  There are no orders currently
                </Typography>
              </Stack>
            </Stack>
          )}
        </Stack>

        {/* Pagination */}
        <Stack alignSelf={is488 ? "center" : "flex-end"} mr={is488 ? 0 : 5} rowGap={2} p={is488 ? 1 : 0}>
          <Pagination
            size={is488 ? "medium" : "large"}
            page={page}
            onChange={(e, newPage) => setPage(newPage)}
            count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
            variant="outlined"
            shape="rounded"
          />
          <Typography textAlign="center">
            Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
            {page * ITEMS_PER_PAGE > totalResults ? totalResults : page * ITEMS_PER_PAGE} of {totalResults} results
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default AdminDashBoard;
