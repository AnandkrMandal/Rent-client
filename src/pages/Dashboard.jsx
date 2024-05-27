
import GetSellerPhonePopup from "../components/GetSellerPhonePopup";
import LikePropertyButton from "../components/LikePropertyButton";
import ShowInterestPopup from "../components/ShowInterestPopup";
import { Link } from "react-router-dom";

const Dashboard = ({ properties}) => {
  return (
    <>
      <div className="container bg-slate-50 mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
             {properties.map((property) => (
            <div
              key={property._id}
              className=" bg-gray-200 border p-4 rounded-lg  shadow-lg"
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
              <h2 className="text-xl font-semibold text-blue-800 mb-2">
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
