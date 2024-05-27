import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import UserLikedProperties from "./UserLikeProperty";

const Account = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneno: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("accessToken");
      console.log(token);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/current-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data.data);
        setFormData({
          fullName: response.data.data.fullName,
          phoneno: response.data.data.phoneno,
          email: response.data.data.email,
        });
      } catch (error) {
        console.error("Error fetching the user data", error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-account`, formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data.data);
      toast.success("Account details updated successfully");
      setIsEditing(false);
      window.location.reload(); 
      
    } catch (error) {
      console.error("Error updating the user data", error);
      toast.error("Error updating the user data");
    }
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="max-w-sm bg-slate-50 rounded  overflow-hidden shadow-lg mx-auto my-6 p-4">
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneno"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneno"
              value={formData.phoneno}
              onChange={handleChange}
              className="shadow appearance-none border bg-slate-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly={true}
              className="shadow appearance-none border rounded w-full bg-slate-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="role"
            >
              Profile
            </label>
            <select
              name="role"
              type="option"
              className="px-3 py-2 rounded-lg bg-slate-100 text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">select your profile</option>
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="bg-gray-500 ml-5 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className=" mb-2">
            <span className="text-gray-700 text-base">Name: </span>
            <span className="text-blue-400 font-bold text-xl">
              {user?.fullName}
            </span>
          </div>
          <p className="text-gray-700 text-base">Phone: {user?.phoneno}</p>
          <p className="text-gray-700 text-base">Email: {user?.email}</p>
          <p className="text-gray-700 text-base">role: {user?.role}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Edit
          </button>
          <Link to="/update-password">
            <button className="bg-cyan-600 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Update Password
            </button>
          </Link>
        </div>
      )}
    </div>
    <UserLikedProperties/>
    </>
  );
};

export default Account;
