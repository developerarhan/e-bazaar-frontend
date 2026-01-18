import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Success from './pages/Success';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import MyOrders from './pages/MyOrders';
import Tracking from './pages/Tracking';
import PrivateRoute from './routes/PrivateRoute';
import Footer from './components/Footer';
import { useTheme } from './context/ThemeContext';


function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected Routes */}
        <Route 
          path="/checkout" 
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/my-orders" 
          element={
            <PrivateRoute>
              <MyOrders />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/tracking/:orderId" 
          element={
            <PrivateRoute>
              <Tracking />
            </PrivateRoute>
          } 
        />
        
        <Route path="/success" element={<Success />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App
