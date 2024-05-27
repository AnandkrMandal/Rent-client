import React, { useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";

const LikePropertyButton = ({ propertyId , likeCountValue }) => {
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likeCount, setLikeCount] = useState(likeCountValue);

 
  const handleLike = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("accessToken");
    const userId = sessionStorage.getItem("userId");
    console.log(token);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/like/${propertyId}`, userId,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      setLiked(response.data.liked);
      setLikeCount(response.data.likeCount);
      toast.success("Property liked successfully");
    } catch (error) {
      toast.error("You have already liked this property");
      console.error("Error liking property", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`text-white ${
        liked ? "bg-red-600" : "bg-pink-600"
      } hover:bg-pink-900 px-8 py-2 mb-2 hover:text-black font-medium rounded text-sm text-center`}
      disabled={loading}
    >
      {loading
        ? "Processing..."
        : liked
        ? `Liked (${likeCount + 1 })`
        : `Like (${likeCountValue })`}
    </button>
  );
};

export default LikePropertyButton;
