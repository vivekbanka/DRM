import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Roles from '../components/Roles';

const router = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/', element: <Login /> },
    {path:'/roles', element:<Roles></Roles>},
    {
        path: '/admin',
        element: (
            <ProtectedRoute requiredRole="Admin">
                <Dashboard adminView />
            </ProtectedRoute>
        ),
    },
];

export default router;