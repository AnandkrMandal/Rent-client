import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const token = sessionStorage.getItem("accessToken");
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log(response.data.data);
            toast.success("Logout successful");

            // Clear the token from sessionStorage
            sessionStorage.removeItem("accessToken");

            // Dispatch the logout action
            dispatch(logout());

            // Navigate to the home page
            navigate("/");
        } catch (error) {
            console.error("Error when logging out", error);
            toast.error("Error when logging out. Please try again.");
        }
    };

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <button
                className="inline-block px-6 py-2 duration-200 text-red-600 hover:bg-red-800 hover:text-white rounded-lg"
                onClick={logoutHandler}
            >
                Logout
            </button>
        </>
    );
}

export default LogoutBtn;

