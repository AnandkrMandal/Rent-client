import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AddProperty = ({ user }) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [area, setArea] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [kitchen, setKitchen] = useState(1);
  const [nearbyFacilities, setNearbyFacilities] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (
      file &&
      ["image/jpeg", "image/png"].includes(
        file.type
      )
    ) {
      setImage(file);
      setImageName(file.name);
    } else {
      toast.error("Only image files are allowed");
      setImage(null);
      setImageName("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("place", place);
    formData.append("area", area);
    formData.append("cityName", cityName);
    formData.append("districtName", districtName);
    formData.append("pincode", pincode);
    formData.append("country", country);
    formData.append("bedrooms", bedrooms);
    formData.append("bathrooms", bathrooms);
    formData.append("kitchen", kitchen);
    formData.append("nearbyFacilities", nearbyFacilities);
    formData.append("image", image);

    const token = sessionStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Property added successfully");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while adding the property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className=" mt-5 mb-5 bg-slate-50">
        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto p-4 bg-slate-50 shadow-md rounded"
        >
          <h2 className="text-2xl justify-center text-center text-blue-700 underline font-bold mb-4">
            Add Property
          </h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              ₹ Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Place
            </label>
            <input
              type="text"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Area
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              City Name
            </label>
            <input
              type="text"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              District Name
            </label>
            <input
              type="text"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bedrooms
            </label>
            <input
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bathrooms
            </label>
            <input
              type="number"
              value={bathrooms}
              onChange={(e) => setBathrooms(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Kitchen
            </label>
            <input
              type="number"
              value={kitchen}
              onChange={(e) => setKitchen(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium  text-gray-700">
              Nearby Facilities
            </label>
            <input
              type="text"
              value={nearbyFacilities}
              onChange={(e) => setNearbyFacilities(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border text-black  bg-slate-100 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4 bg-slate-100">
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center bg-slate-50 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
                {imageName && (
                  <p className="mt-2 text-sm text-gray-500">{imageName}</p>
                )}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={24} color={"#ffffff"} />
            ) : (
              "Add Property"
            )}
          </button>
          <Link to="/dashboard">
            <button
              type="button"
              className="w-full mt-4 mb-4 bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-800"
            >
              Cancel
            </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default AddProperty;
