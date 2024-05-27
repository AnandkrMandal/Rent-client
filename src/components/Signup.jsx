import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Button, Input } from './index';
import { ClipLoader } from "react-spinners"; 

const RegisterUser = () => {
  const { register, handleSubmit } = useForm();
//   const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    console.log(data);
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`, data);
      console.log("account created successfully", response.data);
      toast.success("account created successfully");
       //navigate("/login")
      
    } catch (error) {
      console.log("Registration failed", error.message);
      toast.error("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
          <div className="mb-2 flex justify-center">
            <span className="inline-block w-full max-w-[100px]">
              {/* <Logo width="100%" /> */}
            </span>
          </div>
          <h2 className="text-center text-teal-500 text-2xl font-bold leading-tight">Sign up to create account</h2>
          <p className="mt-2 text-center text-base text-blue-400">
            Already have an account?&nbsp;
            <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5'>
              <Input
                label="Full Name: "
                placeholder="Enter your full name"
                {...register("fullName", {
                  required: "Full name is required",
                  pattern: { value: /^[A-Za-z ]+$/i, message: "Invalid name format" }
                })}
              />
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email format" }
                })}
              />
              <Input
                label="Phone-No: "
                placeholder="Enter your phone number"
                type="text"
                max={10}
                {...register("phoneno", {
                  required: "Phone number is required",
                  pattern: { value: /^\d{10}$/, message: "Phone number must be 10 digits" }
                })}
              />
              <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <select
               name='role'
                className='px-3 py-2  rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full'
                {...register("role", { required: "Role is required" })}
              >
                <option value="">sellect from list</option>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ?  <ClipLoader size={24} color={"#ffffff"} />: "Create Account"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { RegisterUser };
