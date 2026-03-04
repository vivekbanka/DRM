import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

const router = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/', element: <Dashboard /> },
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