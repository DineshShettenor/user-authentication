import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthPage from "../components/AuthPage";
import Dashboard from "../dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
    //   { path: "/categories/:categoryName", element: <CategoryPage /> },
    //   { path: "/search", element: <Search /> },
    //   { path: "/shop", element: <ShopPage /> },
    //   { path: "/shop/:id", element: <SingleProduct /> },
    ],
  },
  {
    path: "/login",
    element: <AuthPage />
  },
//   {
//     path: "/register",
//     element: <Register />
//   }
]);

export default router;
