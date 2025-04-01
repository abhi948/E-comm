"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchProductsAsync,
  selectProductFetchStatus,
  selectProductTotalResults,
  selectProducts,
} from "../ProductSlice"
import { ProductCard } from "./ProductCard"
import { selectBrands } from "../../brands/BrandSlice"
import { selectCategories } from "../../categories/CategoriesSlice"
import { ITEMS_PER_PAGE } from "../../../constants"
import {
  createWishlistItemAsync,
  deleteWishlistItemByIdAsync,
  selectWishlistItems,
} from "../../wishlist/WishlistSlice"
import { selectLoggedInUser } from "../../auth/AuthSlice"
import {
  banner1,
  banner2,
  banner3,
  banner4,
  loadingAnimation,
} from "../../../assets"
import { ProductBanner } from "./ProductBanner"
import Lottie from "lottie-react"
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"

const sortOptions = [
  { name: "Price: low to high", sort: "price", order: "asc" },
  { name: "Price: high to low", sort: "price", order: "desc" },
]

const bannerImages = [banner1, banner3, banner2, banner4]

export const ProductList = () => {
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState("")
  const [filterDialogOpen, setFilterDialogOpen] = useState(false)
  const theme = useTheme()

  // Breakpoints for responsiveness
  const is1200 = useMediaQuery(theme.breakpoints.down(1200))
  const is800 = useMediaQuery(theme.breakpoints.down(800))
  const is600 = useMediaQuery(theme.breakpoints.down(600))
  const is500 = useMediaQuery(theme.breakpoints.down(500))

  // Redux selectors
  const brands = useSelector(selectBrands)
  const categories = useSelector(selectCategories)
  const products = useSelector(selectProducts)
  const totalResults = useSelector(selectProductTotalResults)
  const loggedInUser = useSelector(selectLoggedInUser)
  const productFetchStatus = useSelector(selectProductFetchStatus)
  const wishlistItems = useSelector(selectWishlistItems)
  const dispatch = useDispatch()

  // Filter handler
  const handleFilters = (type, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev }
      if (newFilters[type]?.includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value)
      } else {
        newFilters[type] = [...(newFilters[type] || []), value]
      }
      return newFilters
    })
  }

  // Wishlist handler
  const handleAddRemoveFromWishlist = (e, productId) => {
    if (e.target.checked) {
      dispatch(createWishlistItemAsync({ user: loggedInUser?._id, product: productId }))
    } else {
      const item = wishlistItems.find((item) => item.product._id === productId)
      if (item) dispatch(deleteWishlistItemByIdAsync(item._id))
    }
  }

  // Effects
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  useEffect(() => {
    setPage(1)
  }, [])

  useEffect(() => {
    const finalFilters = {
      ...filters,
      pagination: { page, limit: ITEMS_PER_PAGE },
      sort: sort || undefined,
      user: !loggedInUser?.isAdmin,
    }
    dispatch(fetchProductsAsync(finalFilters))
  }, [filters, page, sort, loggedInUser, dispatch])

  return (
    <Box
      sx={{
        // Use a clean, neutral background that complements the Navbar and Footer
        backgroundColor: theme.palette.background.paper,
        minHeight: "100vh",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        {productFetchStatus === "pending" ? (
          <Stack
            width="100%"
            height="calc(100vh - 4rem)"
            justifyContent="center"
            alignItems="center"
          >
            <Lottie
              animationData={loadingAnimation}
              style={{
                width: is500 ? "80%" : "40%",
                maxWidth: 300,
              }}
            />
          </Stack>
        ) : (
          <>
            {/* Banner Section */}
            {!is600 && (
              <Box mb={4}>
                <ProductBanner images={bannerImages} />
              </Box>
            )}

            {/* Header with Filter Button & Sort Options */}
            <Box
              mb={4}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
            >
              <Button
                variant="outlined"
                startIcon={<FilterListIcon />}
                onClick={() => setFilterDialogOpen(true)}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                }}
              >
                Filters
              </Button>

              <FormControl variant="outlined" sx={{ minWidth: 200 }}>
                <InputLabel id="sort-label">Sort By</InputLabel>
                <Select
                  labelId="sort-label"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  label="Sort By"
                >
                  <MenuItem value="">
                    <em>Default Sorting</em>
                  </MenuItem>
                  {sortOptions.map((option) => (
                    <MenuItem key={option.name} value={JSON.stringify(option)}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {/* Filter Dialog */}
            <Dialog
              open={filterDialogOpen}
              onClose={() => setFilterDialogOpen(false)}
              fullWidth
              maxWidth="sm"
            >
              <DialogTitle>Filters</DialogTitle>
              <DialogContent dividers>
                <Box mt={1}>
                  <Typography variant="subtitle1" gutterBottom>
                    Artisan Houses
                  </Typography>
                  <FormGroup>
                    {brands?.map((brand) => (
                      <FormControlLabel
                        key={brand._id}
                        control={
                          <Checkbox
                            checked={filters.brand?.includes(brand._id) || false}
                            onChange={() => handleFilters("brand", brand._id)}
                            sx={{
                              color: theme.palette.primary.main,
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        }
                        label={brand.name}
                      />
                    ))}
                  </FormGroup>
                </Box>
                <Box mt={2}>
                  <Typography variant="subtitle1" gutterBottom>
                    Craft Categories
                  </Typography>
                  <FormGroup>
                    {categories?.map((category) => (
                      <FormControlLabel
                        key={category._id}
                        control={
                          <Checkbox
                            checked={filters.category?.includes(category._id) || false}
                            onChange={() => handleFilters("category", category._id)}
                            sx={{
                              color: theme.palette.primary.main,
                              "&.Mui-checked": {
                                color: theme.palette.primary.main,
                              },
                            }}
                          />
                        }
                        label={category.name}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setFilterDialogOpen(false)}>Apply</Button>
              </DialogActions>
            </Dialog>

            {/* Product Grid */}
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product._id}>
                  <ProductCard
                    id={product._id}
                    title={product.title}
                    thumbnail={product.thumbnail}
                    brand={product.brand.name}
                    price={product.price}
                    handleAddRemoveFromWishlist={handleAddRemoveFromWishlist}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(totalResults / ITEMS_PER_PAGE)}
                page={page}
                onChange={(e, newPage) => setPage(newPage)}
                color="primary"
                size="medium"
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  )
}

export default ProductList
