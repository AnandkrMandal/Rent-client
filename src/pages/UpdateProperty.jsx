import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners"; 

const UpdateProperty = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState({
    title: "",
    image: "",
    description: "",
    price: "",
    place: "",
    area: "",
    cityName: "",
    districtName: "",
    pincode: "",
    country: "",
    bedrooms: 0,
    bathrooms: 0,
    kitchen: 0,
    nearbyFacilities: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      const token = sessionStorage.getItem("accessToken");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/property/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProperty(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", property.title);
    formData.append("description", property.description);
    formData.append("place", property.place);
    formData.append("price", property.price);
    formData.append("area", property.area);
    formData.append("cityName", property.cityName);
    formData.append("districtName", property.districtName);
    formData.append("pincode", property.pincode);
    formData.append("country", property.country);
    formData.append("bedrooms", property.bedrooms);
    formData.append("bathrooms", property.bathrooms);
    formData.append("kitchen", property.kitchen);
    formData.append("nearbyFacilities", property.nearbyFacilities);
    if (image) {
      formData.append("image", image);
    }

    const token = sessionStorage.getItem("accessToken");
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/update-property/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Property updated successfully");
      navigate("/all-posts");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 mt-4 mb-5 bg-slate-50 shadow-md rounded"
      >
        <h2 className="text-2xl text-blue-600 font-bold mb-4">Update Property</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Current Image</label>
          {property.image && (
            <img
              src={property.image[0]}
              alt={property.title}
              className="w-full h-64 object-cover rounded-md"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={property.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ₹ Price
            </label>
            <input
              type="text"
              name="price"
              value={property.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Place</label>
          <input
            type="text"
            name="place"
            value={property.place}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Area</label>
          <input
            type="text"
            name="area"
            value={property.area}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">City Name</label>
          <input
            type="text"
            name="cityName"
            value={property.cityName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">District Name</label>
          <input
            type="text"
            name="districtName"
            value={property.districtName}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={property.pincode}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={property.country}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bedrooms</label>
          <input
            type="number"
            name="bedrooms"
            value={property.bedrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
          <input
            type="number"
            name="bathrooms"
            value={property.bathrooms}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Kitchen</label>
          <input
            type="number"
            name="kitchen"
            value={property.kitchen}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nearby Facilities</label>
          <input
            type="text"
            name="nearbyFacilities"
            value={property.nearbyFacilities}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center bg-slate-50 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                onChange={handleFileChange}
                className="hidden bg-slate-100"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {loading ? <ClipLoader size={24} color={"#ffffff"} />  : "Update Property"}
        </button>
      </form>
    </>
  );
};

export default UpdateProperty;
