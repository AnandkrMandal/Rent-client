import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GetSellerPhonePopup from "./GetSellerPhonePopup";
import LikePropertyButton from "./LikePropertyButton";
import ShowInterestPopup from "./ShowInterestPopup";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/property-details/${id}`
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching the property data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!property) {
    return <div className="text-center py-10">Property not found</div>;
  }

  return (
    <>
    <div className="container justify-center items-center bg-slate-50 mx-auto my-auto p-4">
        <div className="flex flex-col bg-">
          <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-0">
            <div className="mt-3 sm:ml-0 sm:mt-0 justify-center items-center">
              <img
                src={property.image[0]}
                alt={property.title}
                className="w-full h-[390px] mx-auto rounded object-cover "
              />
            </div>
            <div className="sm:pl-0 sm:pt-0 lg:pl-10 lg:pt-6 my-auto justify-center items-center">
            <p className="text-blue-600 font-bold text-xl">Price ₹{property.price}</p>  
              <h2 className="text-xl font-semibold text-orange-800 mb-2">
                {property.title.trim()}
              </h2>
              <p className="text-gray-600 mb-2">
                <strong className="">Description: </strong>
                {property.description.trim()}
              </p>
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
              <p className="text-gray-600 mb-2">
                <i className="fa-solid fa-square-plus"></i>
                <strong className="ml-2">Nearby Facilities:</strong>{" "}
                {property.nearbyFacilities.join(", ")}
              </p>
              <div className="mt-6 justify-between">
                {authStatus ? (
                  <>
                    <div className=" mt-6 flex flex-col">
                      <GetSellerPhonePopup propertyId={property._id} />
                      <ShowInterestPopup propertyId={property._id} />
                      <LikePropertyButton
                        propertyId={property._id}
                        likeCountValue={property.likeCount}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <strong className="text-red-600 mr-3">
                    <i className="fa-solid fa-heart"></i> {property.likeCount}
                    </strong>
                    <Link
                      to="/login"
                      className="text-white bg-red-500 hover:bg-blue-400 hover:text-black focus:outline-none md:w-5 font-medium  text-sm px-5 py-2.5 mr-3 text-center "
                    >
                      Show Interest
                    </Link>
                    <Link
                      to="/login"
                      className="text-white bg-green-400 hover:bg-blue-400 hover:text-black font-medium rounded md:w-5 text-sm px-5 py-2.5 text-center "
                    >
                      Get Contact Details
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
