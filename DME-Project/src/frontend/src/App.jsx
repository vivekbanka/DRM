import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import router from './router/routers';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {router.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;