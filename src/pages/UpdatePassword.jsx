import React, { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/change-password`,
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Password updated successfully!');
      toast.success("Password updated successfully!");
    } catch (error) {
      setMessage('Error updating password. Please try again.');
      console.error('Error:', error);
      toast.error("Error updating password. Please try again.");
    }
  };

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    
    <div className="max-w-sm rounded overflow-hidden shadow-lg mx-auto my-4 p-4">
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="oldPassword">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            name="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="shadow appearance-none border  bg-slate-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 bg-slate-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Change Password
        </button>
        <Link to="/account" 
        className='bg-gray-500 ml-5 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          Cancel
        </Link>
        {message && <p className="text-red-500 text-xs italic mt-4">{message}</p>}
      </form>
    </div>
    </>
  );
};

export default ChangePasswordForm;
