import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store';
import LoginScreen from './screens/LoginScreen';
import CartScreen from './screens/CartScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PrivateRoutes from './components/PrivateRoutes';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminRoutes from './components/AdminRoutes';
import OrderListScreen from './screens/admin/OrderListScreen';
import ProductListScreen from './screens/admin/ProductListScreen';
import ProductEditScreen from './screens/admin/ProductEditScreen';
import UserListScreen from './screens/admin/UserListScreen';
import { HelmetProvider } from 'react-helmet-async';
// import ResumeScreen from './screens/ResumeScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/book/:id' element={<ProductScreen />} />

      <Route path='/login' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/favorites' element={<CartScreen />} />
      <Route path='/register' element={<RegisterScreen />} />


      <Route path='' element={<PrivateRoutes />} >
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='book/:id/edit' element={<ProductEditScreen />} />
        {/* <Route path='/resume' element={<ResumeScreen />} /> */}
      </Route>
        <Route path='/profile' element={<ProfileScreen />} />
      <Route path='' element={<AdminRoutes />} >
        <Route path='/admin/userlist' element={<UserListScreen />} />
        <Route path='/admin/productlist' element={<ProductListScreen />} />
        {/* <Route path='/admin/orderlist' element={<OrderListScreen />} /> */}
      </Route>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

