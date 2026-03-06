import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routesConfig from './Routing/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        {renderRoutes(routesConfig)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
