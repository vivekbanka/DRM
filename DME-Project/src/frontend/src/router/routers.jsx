import Login from '../components/Login';
import Register from '../components/Register';
import Dashboard from '../components/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';
import Roles from '../components/Roles';
import Layout from '../components/Layout';

const router = [
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> },
    { path: '/dashboard', element: (
        <Layout>
            <Dashboard />
        </Layout>
    )},
    { path: '/', element: <Login /> },
    {path:'/roles', element:(
        <Layout>
            <Roles></Roles>
        </Layout>
    )},
    {
        path: '/admin',
        element: (
            <ProtectedRoute requiredRole="Admin">
                <Layout>
                    <Dashboard adminView />
                </Layout>
            </ProtectedRoute>
        ),
    },
];

export default router;