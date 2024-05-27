import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DeletePropertyPopup from "./DeleteProperty";
import myImage from "../assets/images/nodata.jpg"

const UserPosts = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/my-properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperties(response.data.data);
      } catch (error) {
        console.error("Error fetching the properties", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleDelete = () => {
    window.location.reload(); 
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container bg-slate-50 mx-auto p-4">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
            Your Listed Properties
          </span>
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
        </h1>
        <p className="text-lg text-gray-800 mb-8">
          Your listed properties for everyone
        </p>
      </div>
      {properties.length === 0 ? (
        <div className="text-center items-center justify-center text-gray-800">
          <img src={myImage}  className="justify-center m-auto" width="500px"  hight="400px"alt=" not find anyting to show"/>
          <p className="text-grat-700 text-xl mt-4 font-mono">You have not posted any properties.</p>
          <Link
           to="/add-property"
           className="text-xl text-blue-600 font-semibold"
           >
            Post Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-gray-200 border p-4 rounded-lg shadow-lg"
            >
              <div className="flex flex-row justify-between">
                <strong className="text-red-600">
                  <i className="fa-solid fa-heart"></i> {property.likeCount}
                </strong>
                <p className="text-blue-600 font-bold text-2xl">
                  ₹{property.price}
                </p>
              </div> 
              <img
                src={property.image[0]}
                alt={property.title}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold mb-2">
                {property.title.trim()}
              </h2>
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-location-dot"></i>
                <strong className="ml-2">Location:</strong> {property.place},{" "}
                {property.cityName}
              </p>
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-bed"></i>
                <strong className="ml-2">Bedrooms:</strong> {property.bedrooms}
              </p>
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-bath"></i>
                <strong className="ml-2">Bathrooms:</strong> {property.bathrooms}
              </p>
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-kitchen-set"></i>
                <strong className="ml-2">Kitchen:</strong> {property.kitchen}
              </p>
              <div className="mt-6 flex flex-row justify-evenly">
                <Link
                  to={`${property._id}/update-property`}
                  className="text-white bg-blue-500 hover:bg-blue-800 hover:text-black focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center mb-2"
                >
                  Update Property
                </Link>
                <DeletePropertyPopup
                  propertyId={property._id}
                  onDelete={handleDelete}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPosts;
