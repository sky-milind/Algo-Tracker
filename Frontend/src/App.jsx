import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes';

function App() {
  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      if (route.children) {
        return (
          <Route key={index} path={route.path} element={route.element}>
            {renderRoutes(route.children)}
          </Route>
        );
      }
      return <Route key={index} {...route} />;
    });
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {renderRoutes(routes)}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
