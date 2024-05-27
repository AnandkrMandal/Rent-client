import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png'

const UserLikedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedProperties = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/liked-properties`,
        {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          }
        );

        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching liked properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedProperties();
  }, []);

  
  if (loading) {
    return  <div class="relative flex justify-center items-center mx-auto my-[50%]">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    <img src={logo}  class="rounded-full h-28 w-28"/>
    </div>;
  }

  if (!properties.length) {
    return <div className="text-center mt-10">No liked properties found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className=" max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Liked Properties
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h1>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="bg-white shadow-md rounded-lg overflow-hidden ">
            <img
              src={property.image[0]}
              alt={property.title}
              className="w-full h-32 sm:h-48 object-cover"
            />
            <div className="p-4">
              <h3 className=" text-cyan-600 text-lg font-bold">{property.title}</h3>
              <p className="text-gray-700 text-sm truncate">{property.description}</p>
              <p className="text-gray-500 text-sm">{property.cityName}, {property.districtName}</p>
              <p className="text-gray-500 text-sm">Price:₹ <b>{property.price}</b></p>
              <button
                onClick={() => navigate(`/property/${property._id}`)}
                className="mt-2 bg-blue-600 text-white py-1 px-2 rounded hover:bg-blue-600 text-sm"
              >
                View Property
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserLikedProperties;
