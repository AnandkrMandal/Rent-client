import React, { useEffect, useState } from "react";
import axios from "axios";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import GetSellerPhonePopup from "../components/GetSellerPhonePopup";
import LikePropertyButton from "../components/LikePropertyButton";
import ShowInterestPopup from "../components/ShowInterestPopup";
import logo from '../assets/images/logo.png'

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/properties-list`
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

  if (loading) {
    return <div class="relative flex justify-center items-center mx-auto my-[50%]">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
    <img src={logo}  class="rounded-full h-28 w-28"/>
    </div>;
  }

  return (
    <>
      <HeroSection />
      <div className="container bg-slate-50 mx-auto p-4">
        <div className="max-w-3xl mx-auto text-center mt-16">
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-2 pb-4 relative">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Our Listed Properties
            </span>
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></span>
          </h1>
          <p className="text-lg text-gray-800 mb-8">
            We've got properties for everyone
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
              
              <h2 className="text-xl  text-blue-800 font-semibold mb-2">
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
                <strong className="ml-2">Bathrooms:</strong>{" "}
                {property.bathrooms}
              </p>
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-kitchen-set"></i>
                <strong className="ml-2">Kitchen:</strong> {property.kitchen}
              </p>
              <div className="mt-6 justify-between">
                {authStatus ? (
                  <>
                    <div className=" mt-6 w-full flex flex-col justify-evenly">
                      <div className=" flex flex-row justify-evenly">
                        <Link
                          to={`/property/${property._id}`}
                          className="px-4 py-2 mb-2 text-center bg-blue-500 text-white rounded hover:bg-blue-900"
                        >
                          View Details
                        </Link>
                        <LikePropertyButton
                          propertyId={property._id}
                          likeCountValue={property.likeCount}
                        />
                      </div>
                      <div>
                        <ShowInterestPopup propertyId={property._id} />
                        <GetSellerPhonePopup propertyId={property._id} />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-full  flex flex-row justify-evenly">
                      <Link
                        to="/login"
                        className="px-4 py-2  bg-orange-500 text-white rounded hover:bg-orange-900"
                      >
                        Show Interest
                      </Link>
                      <Link
                        to={`/property/${property._id}`}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-900"
                      >
                        View Details
                      </Link>
                    </div>
                    <Link
                      to="/login"
                      className="flex justify-center items-center text-center  mt-5 px-4 py-2 bg-green-400 text-white rounded hover:bg-green-700"
                    >
                      <i class="fa fa-whatsapp" aria-hidden="true"></i>
                      <span className="pl-3"> Get Contact Details</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
