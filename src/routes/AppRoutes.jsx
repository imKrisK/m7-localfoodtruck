import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import DashboardPage from '../pages/DashboardPage';
import NotFound from '../pages/PageNotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CatDetail from '../pages/CatDetail';
import UserProfile from '../pages/UserProfile';
import CheckoutPage from '../pages/CheckoutPage';
import MenuPage from '../pages/Menu.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {
    return (
      <Routes>
        {/* Route for the DashboardPage */}
        <Route path="/dashboard" element={<DashboardPage {...props} />} />

        {/* Route for the Login page */}
        <Route path="/login" element={<Login {...props} />} />

        {/* Route for the Register page */}
        <Route path="/register" element={<Register {...props} />} />

        {/* Route for User Profile */}
        <Route path="/profile" element={<UserProfile />} />

        {/* Route for Checkout (Stripe payment) */}
        <Route path="/checkout" element={<CheckoutPage />} />


        {/* Route for Menu */}
        <Route path="/menu" element={<MenuPage />} />

        {/* Route for About */}
        <Route path="/about" element={<About />} />

        {/* Route for Contact */}
        <Route path="/contact" element={<Contact />} />

        {/* Default route for home page */}
        <Route index element={<Homepage {...props} />} />

        {/* Fallback route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}

export default AppRoutes;