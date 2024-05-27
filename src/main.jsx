import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout } from './components/index.js'
import Home from './pages/Home';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Account from "./pages/Account";
import ChangePasswordForm from "./pages/UpdatePassword";
import UserPosts from "./pages/UserPosts";
import AddProperty from "./pages/AddProperty";
import UpdateProperty from "./pages/UpdateProperty";
import FilterData from "./pages/FilterPage";
import PropertyDetails from "./components/PropertyDetailsById";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/property/:id",
        element: <PropertyDetails/>,
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
                {" "}
                <UserPosts/>
            </AuthLayout>
        ),
      },
      {
        path: "/dashboard",
        element: (
            <AuthLayout authentication>
                {" "}
             <FilterData/>
            </AuthLayout>
        ),
      },
      {
        path: "/update-password",
        element: (
            <AuthLayout authentication>
                {" "}
              <ChangePasswordForm/>
            </AuthLayout>
        ),
      },
      {
        path: "/add-property",
        element: (
            <AuthLayout authentication>
                {" "}
              <AddProperty/>
            </AuthLayout>
        ),
      },
      {
        path: "/all-posts/:id/update-property",
        element: (
            <AuthLayout authentication>
                {" "}
             <UpdateProperty/>
            </AuthLayout>
        ),
      },
      {
        path: "/account",
        element: (
            <AuthLayout authentication>
                {" "}
            <Account/>
            </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
