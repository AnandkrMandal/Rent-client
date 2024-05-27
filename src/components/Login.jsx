import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { login as authLogin } from '../store/authSlice'
import { useForm } from 'react-hook-form';
import {useDispatch} from "react-redux"
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { Button, Input } from './index';
import { ClipLoader } from "react-spinners"; 

const Userlogin = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setError("");
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, data);
      if(response.data.data){
        sessionStorage.setItem("accessToken", response.data.data.accessToken);
        sessionStorage.setItem("refreshToken", response.data.data.refreshToken);
        sessionStorage.setItem("userId", response.data._id);
        dispatch(authLogin(response.data.data))
        console.log("account login successfully");
        toast.success("login success");
        navigate("/dashboard");
      }
      
    } catch (error) {
      console.log("LogIn failed", error.message);
      toast.error("LogIn failed: " + error.message);
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
          <h2 className="text-center text-2xl text-teal-500  font-bold leading-tight">Sign in to your account</h2>
          <p className="mt-2 text-center text-base text-blue-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-5'>

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
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
              <ClipLoader size={24} color={"#ffffff"} />
            )  : (
              "Login"
            )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { Userlogin };