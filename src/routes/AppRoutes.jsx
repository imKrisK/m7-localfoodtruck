import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import DashboardPage from '../pages/DashboardPage';
import NotFound from '../pages/PageNotFound';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CatDetail from '../pages/CatDetail';
import UserProfile from '../pages/UserProfile';

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

        {/* Default route for home page */}
        <Route index element={<Homepage {...props} />} />

        {/* Fallback route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}

export default AppRoutes;