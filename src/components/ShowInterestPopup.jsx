import React, { useState } from "react";
import axios from "axios";

const ShowInterestPopup = ({ propertyId }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleShowInterest = async () => {
    setLoading(true);
    setError(null);
    const token = sessionStorage.getItem("accessToken");
    console.log(token);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/interested/${propertyId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(
        "Your interest has been recorded. A confirmation email has been sent."
      );
    } catch (err) {
      setError("Failed to show interest. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setShowPopup(true)}
        className="text-white bg-purple-600 hover:bg-purple-900 hover:text-black w-[100%] font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        Show Interest
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Interest</h2>
            <p className="mb-4">
              Are you sure you want to show interest in this property?
            </p>
            {loading ? (
              <p>Processing...</p>
            ) : message ? (
              <div>
                 <p className="text-green-600">{message}</p>
                 <button
                  onClick={() => setShowPopup(false)}
                  className=" mt-4 px-4 py-2 rounded-lg bg-red-400 text-gray-600 hover:text-gray-900 mr-4"
                  >
                 close
                </button>
              </div>
             
            ) : error ? (
              <div>
                <p className="text-red-600">{error}</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-600  mt-4 px-4 py-2 rounded-lg bg-gray-400  hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPopup(false)}
                  className="text-gray-600 hover:text-gray-900 mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShowInterest}
                  className="text-white bg-green-600 hover:bg-green-800 font-medium rounded-full text-sm px-5 py-2.5"
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInterestPopup;
