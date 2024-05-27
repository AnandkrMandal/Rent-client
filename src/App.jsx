import "./App.css";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/index";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import axios from "axios";
import Nav from "./components/Header/Nav";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = sessionStorage?.getItem("accessToken");
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.data.data) {
            dispatch(login(response.data.data));
          } else {
            dispatch(logout());
          }
        } finally {
          setLoading(false);
        }
      }
      else{
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return !loading ? (
    <>
      {/* <Header /> */}
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;
