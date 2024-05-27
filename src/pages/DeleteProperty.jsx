import axios from 'axios';
import React, { useState } from 'react';

const DeletePropertyPopup = ({ propertyId, onDelete }) => {
  const [showPopup, setShowPopup] = useState(false);
 
  const handleDelete = async () => {
    const token = sessionStorage.getItem("accessToken");
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/delete-property/${propertyId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete(); 
      setShowPopup(false); 
    } catch (error) {
      console.error('Error deleting property:', error);

    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className=" justify-between text-white bg-red-600 hover:bg-red-900 hover:text-black font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Delete Property
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-4">Are you sure you want to delete this property?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="text-white bg-red-600 hover:bg-red-900 px-4 py-2 rounded-md">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePropertyPopup;
