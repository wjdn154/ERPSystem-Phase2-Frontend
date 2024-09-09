import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
    const token = Cookies.get('jwt');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            Cookies.remove('jwt');
            return <Navigate to="/login" replace />;
        }
    } catch (e) {
        Cookies.remove('jwt');
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;