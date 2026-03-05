import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routesConfig from './Routing/AppRoutes';

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
    <BrowserRouter>
      <Routes>
        {renderRoutes(routesConfig)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
