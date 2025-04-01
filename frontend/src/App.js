// import { useSelector } from 'react-redux';
// import {
//   Navigate,
//   Route, RouterProvider, createBrowserRouter, createRoutesFromElements
// } from "react-router-dom";
// import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
// import { Logout } from './features/auth/components/Logout';
// import { Protected } from './features/auth/components/Protected';
// import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
// import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
// import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
// import { AdminDashboardPage } from './pages/AdminDashboardPage';
// import { NotFoundPage } from './pages/NotFoundPage';


// function App() {

//   const isAuthChecked=useSelector(selectIsAuthChecked)
//   const loggedInUser=useSelector(selectLoggedInUser)


//   useAuthCheck();
//   useFetchLoggedInUserDetails(loggedInUser);


//   const routes = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         <Route path='/signup' element={<SignupPage/>}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
//         <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
//         <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
//         <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
//         <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

//         {
//           loggedInUser?.isAdmin?(
//             // admin routes
//             <>
//             <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
//             <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
//             <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
//             <Route path='/admin/orders'  element={<Protected><AdminOrdersPage/></Protected>}/>
//             <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
//             </>
//           ):(
//             // user routes
//             <>
//             <Route path='/' element={<Protected><HomePage/></Protected>}/>
//             <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
//             <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
//             <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
//             <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
//             <Route path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
//             <Route path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
//             </>
//           )
//         }

//         <Route path='*' element={<NotFoundPage/>} />

//       </>
//     )
//   )

  
//   return isAuthChecked ? <RouterProvider router={routes}/> : "";
// }

// export default App;




//   const isAuthChecked=useSelector(selectIsAuthChecked)
//   const loggedInUser=useSelector(selectLoggedInUser)


//   useAuthCheck();
//   useFetchLoggedInUserDetails(loggedInUser);


//   const routes = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         <Route path='/signup' element={<SignupPage/>}/>
//         <Route path='/login' element={<LoginPage/>}/>
//         <Route path='/verify-otp' element={<OtpVerificationPage/>}/>
//         <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
//         <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage/>}/>
//         <Route exact path='/logout' element={<Protected><Logout/></Protected>}/>
//         <Route exact path='/product-details/:id' element={<Protected><ProductDetailsPage/></Protected>}/>

//         {
//           loggedInUser?.isAdmin?(
//             // admin routes
//             <>
//             <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage/></Protected>}/>
//             <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage/></Protected>}/>
//             <Route path='/admin/add-product' element={<Protected><AddProductPage/></Protected>}/>
//             <Route path='/admin/orders'  element={<Protected><AdminOrdersPage/></Protected>}/>
//             <Route path='*' element={<Navigate to={'/admin/dashboard'}/>}/>
//             </>
//           ):(
//             // user routes
//             <>
//             <Route path='/' element={<Protected><HomePage/></Protected>}/>
//             <Route path='/product' element={<Protected><ProductListingPage/></Protected>}/>
//             <Route path='/cart' element={<Protected><CartPage/></Protected>}/>
//             <Route path='/profile' element={<Protected><UserProfilePage/></Protected>}/>
//             <Route path='/checkout' element={<Protected><CheckoutPage/></Protected>}/>
//             <Route path='/order-success/:id' element={<Protected><OrderSuccessPage/></Protected>}/>
//             <Route path='/orders' element={<Protected><UserOrdersPage/></Protected>}/>
//             <Route path='/wishlist' element={<Protected><WishlistPage/></Protected>}/>
//             </>
//           )
//         }

//         <Route path='*' element={<NotFoundPage/>} />
//         <Route path='/about' element={<AboutPage/>} />
//         <Route path='/contact' element={<ContactPage/>} />


// import { useSelector } from 'react-redux';
// import {
//   Navigate,
//   Route, RouterProvider, createBrowserRouter, createRoutesFromElements
// } from "react-router-dom";
// import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
// import { Logout } from './features/auth/components/Logout';
// import { Protected } from './features/auth/components/Protected';
// import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
// import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
// import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
// import { AdminDashboardPage } from './pages/AdminDashboardPage';
// import { NotFoundPage } from './pages/NotFoundPage';
// import ContactChatBox  from './features/about/ContactChatBox';
// import { AboutPage } from './pages/AboutPage';
// import { ProductListingPage } from './pages/PoroductListingPage';
// import ContactPage from './pages/ContactPage';
// import { useState, useEffect } from 'react'; // Import useState
// import loadingGif from './assets/animations/UUN.gif'; // Import your GIF

// function App() {

//   const isAuthChecked = useSelector(selectIsAuthChecked);
//   const loggedInUser = useSelector(selectLoggedInUser);
//   const [isLoading, setIsLoading] = useState(true); // Add loading state

//   useAuthCheck();
//   useFetchLoggedInUserDetails(loggedInUser);

//   useEffect(() => {
//     // Check if authentication check has finished AND the component has mounted
//     let isMounted = true; // Flag to track component mount status

//     if (isAuthChecked) {
//       setTimeout(() => { // Small delay to ensure initial render with GIF
//         if (isMounted) {
//           setIsLoading(false);
//         }
//       }, 5000); // Adjust delay as needed
//     }

//     return () => { isMounted = false; }; // Cleanup on unmount (important!)
//   }, [isAuthChecked]);

//   const routes = createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         <ContactChatBox />
//         <Route path='/signup' element={<SignupPage />} />
//         <Route path='/login' element={<LoginPage />} />
//         <Route path='/verify-otp' element={<OtpVerificationPage />} />
//         <Route path='/forgot-password' element={<ForgotPasswordPage />} />
//         <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage />} />
//         <Route exact path='/logout' element={<Protected><Logout /></Protected>} />
//         <Route exact path='/product-details/:id' element={<ProductDetailsPage />} /> {/* No protection here */}

//         {
//           loggedInUser?.isAdmin ? (
//             // admin routes
//             <>
//               <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage /></Protected>} />
//               <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage /></Protected>} />
//               <Route path='/admin/add-product' element={<Protected><AddProductPage /></Protected>} />
//               <Route path='/admin/orders' element={<Protected><AdminOrdersPage /></Protected>} />
//               <Route path='*' element={<Navigate to={'/admin/dashboard'} />} />
//             </>
//           //   <>
//           //   <Route path='/admin/dashboard' element={<AdminDashboardPage />} />
//           //   <Route path='/admin/product-update/:id' element={<ProductUpdatePage />} />
//           //   <Route path='/admin/add-product' element={<AddProductPage />} />
//           //   <Route path='/admin/orders' element={<AdminOrdersPage />} />
//           //   <Route path='*' element={<Navigate to={'/admin/dashboard'} />} />
//           // </>

//           ) : (
//             // user routes
//             <>
//               <Route path='/' element={<HomePage />} /> {/* No protection here */}
//               <Route path='/product' element={<ProductListingPage />} /> {/* No protection here */}
//               <Route path='/about' element={<AboutPage />} />
//               <Route path='/contact' element={<ContactPage />} />
//               <Route path='/cart' element={<Protected><CartPage /></Protected>} /> {/* Protected */}
//               <Route path='/profile' element={<Protected><UserProfilePage /></Protected>} /> {/* Protected */}
//               <Route path='/checkout' element={<Protected><CheckoutPage /></Protected>} /> {/* Protected */}
//               <Route path='/order-success/:id' element={<Protected><OrderSuccessPage /></Protected>} /> {/* Protected */}
//               <Route path='/orders' element={<Protected><UserOrdersPage /></Protected>} /> {/* Protected */}
//               <Route path='/wishlist' element={<Protected><WishlistPage /></Protected>} /> {/* Protected */}
//               <Route path='*' element={<NotFoundPage />} />
//             </>
//           )
//         }


//       </>
//     )
//   );


//   if (isLoading) {
//     return (
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed'}}>
//         <img src={loadingGif} alt="Loading..." />
//       </div>
//     );
//   }

//   return <RouterProvider router={routes} />;

  

// }

// export default App;


import { useSelector } from 'react-redux';
import {
  Navigate,
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements
} from "react-router-dom";
import { selectIsAuthChecked, selectLoggedInUser } from './features/auth/AuthSlice';
import { Logout } from './features/auth/components/Logout';
import { Protected } from './features/auth/components/Protected';
import { useAuthCheck } from "./hooks/useAuth/useAuthCheck";
import { useFetchLoggedInUserDetails } from "./hooks/useAuth/useFetchLoggedInUserDetails";
import { AddProductPage, AdminOrdersPage, CartPage, CheckoutPage, ForgotPasswordPage, HomePage, LoginPage, OrderSuccessPage, OtpVerificationPage, ProductDetailsPage, ProductUpdatePage, ResetPasswordPage, SignupPage, UserOrdersPage, UserProfilePage, WishlistPage } from './pages';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { AboutPage } from './pages/AboutPage';
import { ProductListingPage } from './pages/PoroductListingPage';
import ContactPage from './pages/ContactPage';
import { useState, useEffect } from 'react';
import loadingGif from './assets/animations/UUN.gif';
// import ContactChatBox from './features/about/ContactChatBox.jsx'; // Import the chat box component
import ChatBot from './features/chatBot/ChatBot.jsx';
import Apidebug from './config/Apidebug.jsx'; // Import the debug component

// Create a layout component that includes the chat box
const MainLayout = ({ children }) => {
  return (
    <>
      {children}
      {/* <ContactChatBox /> */}
      <ChatBot />
      <Apidebug />
    </>
  );
};

function App() {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const loggedInUser = useSelector(selectLoggedInUser);
  const [isLoading, setIsLoading] = useState(true);

  useAuthCheck();
  useFetchLoggedInUserDetails(loggedInUser);

  useEffect(() => {
    let isMounted = true;

    if (isAuthChecked) {
      setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 5000);
    }

    return () => { isMounted = false; };
  }, [isAuthChecked]);

  const routes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verify-otp' element={<OtpVerificationPage />} />
        <Route path='/forgot-password' element={<ForgotPasswordPage />} />
        <Route path='/reset-password/:userId/:passwordResetToken' element={<ResetPasswordPage />} />
        <Route exact path='/logout' element={<Protected><Logout /></Protected>} />
        <Route exact path='/product-details/:id' element={<ProductDetailsPage />} />

        {
          loggedInUser?.isAdmin ? (
            // admin routes
            <>
              <Route path='/admin/dashboard' element={<Protected><AdminDashboardPage /></Protected>} />
              <Route path='/admin/product-update/:id' element={<Protected><ProductUpdatePage /></Protected>} />
              <Route path='/admin/add-product' element={<Protected><AddProductPage /></Protected>} />
              <Route path='/admin/orders' element={<Protected><AdminOrdersPage /></Protected>} />
              <Route path='*' element={<Navigate to={'/admin/dashboard'} />} />
            </>
          ) : (
            // user routes with MainLayout wrapper
            <>
              <Route path='/' element={<MainLayout><HomePage /></MainLayout>} />
              <Route path='/product' element={<MainLayout><ProductListingPage /></MainLayout>} />
              <Route path='/about' element={<MainLayout><AboutPage /></MainLayout>} />
              <Route path='/contact' element={<MainLayout><ContactPage /></MainLayout>} />
              <Route path='/cart' element={<Protected><MainLayout><CartPage /></MainLayout></Protected>} />
              <Route path='/profile' element={<Protected><MainLayout><UserProfilePage /></MainLayout></Protected>} />
              <Route path='/checkout' element={<Protected><MainLayout><CheckoutPage /></MainLayout></Protected>} />
              <Route path='/order-success/:id' element={<Protected><MainLayout><OrderSuccessPage /></MainLayout></Protected>} />
              <Route path='/orders' element={<Protected><MainLayout><UserOrdersPage /></MainLayout></Protected>} />
              <Route path='/wishlist' element={<Protected><MainLayout><WishlistPage /></MainLayout></Protected>} />
              <Route path='*' element={<NotFoundPage />} />
            </>
          )
        }
      </>
    )
  );

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', position: 'fixed'}}>
        <img src={loadingGif} alt="Loading..." />
      </div>
    );
  }

  return <RouterProvider router={routes} />;
}

export default App;