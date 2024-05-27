import React, { useState } from "react";
import axios from "axios";

const GetSellerPhonePopup = ({ propertyId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetPhoneNumber = async () => {
    setLoading(true);
    setError(null);
    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/property/${propertyId}/seller-phone`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPhoneNumber(response.data.phoneNo);
    } catch (err) {
      setError("Failed to fetch phone number. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          setShowPopup(true);
          handleGetPhoneNumber();
        }}
        className= " bg-green-600 hover:bg-green-900 text-white font-medium w-[100%] rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        <i class="fa fa-whatsapp" aria-hidden="true"></i><span className="pl-3"> Get Contact Details</span>
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Seller's Phone Number</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : (
              <p className="mb-4 font-bold text-xl text-blue-900 ">
                {phoneNumber || "Phone number not available"}
              </p>
            )}
            <div className="flex justify-end">
              <button
                onClick={() => setShowPopup(false)}
                className="text-gray-600 hover:text-gray-900 mr-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetSellerPhonePopup;
