import { Routes, Route } from 'react-router-dom';
import Homepage from '../pages/Homepage';
import DashboardPage from '../pages/DashboardPage';
import NotFound from '../pages/PageNotFound';
import AboutPage from '../pages/AboutPage'; // Importing the AboutPage component

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {
    return (
      <Routes>
        {/* Route for the AboutPage */}
        <Route path="/about" element={<AboutPage {...props} />} />

        {/* Route for the DashboardPage */}
        <Route path="/dashboard" element={<DashboardPage {...props} />} />

        {/* Default route for home page */}
        <Route index element={<Homepage {...props} />} />

        {/* Fallback route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
}

export default AppRoutes;