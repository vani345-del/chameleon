import React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserLayout from './components/Layout/UserLayout';
import Home from './pages/Home';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetails from './components/Products/ProductDetails';
import CheckOut from './components/Cart/CheckOut';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderDeatilsPage from './pages/OrderDeatilsPage';
import MyordersPage from './pages/MyordersPage';
import AdminLayout from './components/Admin/AdminLayout';
import AdminHomePage from './pages/AdminHomePage';
import UserManagement from './components/Admin/UserManagement';
import ProductManagement from './components/Admin/ProductManagement';
import EditProductPage from './components/Admin/EditProductPage';
import OrderManagement from './components/Admin/OrderManagement';

import {Provider} from "react-redux";
import store from "./redux/store"
import ProtectedRoute from './components/Common/ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Toaster position="top-right"/>
    <Routes>
         <Route path="/" element={<UserLayout/>}>
         <Route index element={<Home/>}/>
         <Route path="login" element={<LoginPage/>}/>
         <Route path="register" element={<RegisterPage/>}/>
         <Route path="profile" element={<ProfilePage/>}/>
         <Route path="collections/:collection" element={<CollectionPage/>}/>
         <Route path="product/:id" element={<ProductDetails/>}/>
         <Route path="checkout" element={<CheckOut/>}/>
         <Route path='order-confirmation' element={<OrderConfirmation/>}/>
         <Route path='order/:id' element={<OrderDeatilsPage/>}/>
         <Route path="/my-orders" element={<MyordersPage/>}/>
         </Route>
         <Route path="/admin" element={<ProtectedRoute role="admin"><AdminLayout/> </ProtectedRoute>}>
         <Route index element={<AdminHomePage/>}/>
         <Route path="users" element={<UserManagement/>}/>
         <Route path="products" element={<ProductManagement/>}/>
         <Route path="products/:id/edit" element={<EditProductPage/>}/>
         <Route path="orders" element={<OrderManagement/>}/>
         </Route>
         
        
        
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
