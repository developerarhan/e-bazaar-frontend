import { Routes, Route } from 'react-router-dom';
import NavBar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Success from './pages/Success';
import PaymentFailed from './pages/PaymentFailed';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgetPassword';
import ResetPassword from './pages/ResetPassword';
import Register from './pages/Register';
import Profile from './pages/Profile';
import OAuthCallback from './pages/OAuthCallback';
import Tracking from './pages/Tracking';
import VerifyEmail from './pages/VerifyEmail';
import PrivateRoute from './routes/PrivateRoute';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Contact from './pages/Contact';
import { useTheme } from './context/ThemeContext';


function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === "dark" 
        ? "bg-neutral-950 text-neutral-50" 
        : "bg-neutral-50 text-neutral-900"
    }`}>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<TermsOfService />} />

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
          path="/tracking/:orderId" 
          element={
            <PrivateRoute>
              <Tracking />
            </PrivateRoute>
          } 
        />
        
        <Route path="/success" element={<Success />} />
        <Route path='/payment-failed' element={<PaymentFailed />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:uidb64/:token" element={<ResetPassword />} />
        <Route path="/oauth/google/callback" element={<OAuthCallback />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App
