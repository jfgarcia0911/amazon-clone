"use client";
import React, { useState } from "react";
import Image from "next/image";
export default function SignUp() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
    const [error, setError] = useState({})

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});

        setError({
            ...error,
            [e.target.id]: ''
        })
	};

    const validateForm = () => {
        const newError = {}

        if(!formData.name.trim()){
            newError.name = "Name is required";
        }
        if(!formData.email.trim()){
            newError.email = "Email is required"
        }
        if(!formData.password){
            newError.password = "Password is required"
        }else if(formData.password.length < 6) {
            newError.password = "Password must be at least 6 characters"
        }
        if(!formData.confirmPassword){
            newError.confirmPassword = 'Please confirm your password'
        }else if(formData.password !== formData.confirmPassword){
            newError.confirmPassword = 'Password do not match'
        }

        setError(newError)
        return Object.keys(newError).length === 0
    }

	const handleSubmit = (e) => {
        e.preventDefault()
        validateForm()
	};
	return (
		<div className="p-10 flex justify-center w-full  ">
			<div>
				<Image
					alt="amazon logo"
					src={`/amazon.png`}
					width={100}
					height={100}
					className="mx-auto mb-5 w-auto h-auto"
				/>

				<div className="border border-gray-300 rounded-xl w-90  p-5">
					<h1 className="text-3xl text-center mb-3">
						Create Account
					</h1>
					<form onSubmit={handleSubmit}>
						<label
							htmlFor="name"
							className="block text-sm font-bold mb-1"
						>
							Your Name
						</label>
						<input
							id="name"
							type="text"
							value={formData.name}
							onChange={handleChange}
							placeholder="Enter your name"
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${error.name ? 'border-red-500 focus:border-red-500' : 'focus:ring-1 focus:ring-blue-400  mb-2'  }`}
						/>
                        <p className="text-red-500 mb-2 mt-1 text-sm">{error.name}</p>

						<label
							htmlFor="email"
							className="block  text-sm font-bold mb-1"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
                            value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${error.email ? 'border-red-500 focus:border-red-500' : 'focus:ring-1 focus:ring-blue-400  mb-2'  }`}
						/>
                        <p className="text-red-500 mb-2 mt-1 text-sm">{error.email}</p>

						<label
							htmlFor="password"
							className="block  text-sm font-bold mb-1"
						>
							Password
						</label>
						<input
							id="password"
							type="password"
                            value={formData.password}
							onChange={handleChange}
							placeholder="Atleast 6 characters"
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${error.password ? 'border-red-500 focus:border-red-500' : 'focus:ring-1 focus:ring-blue-400  mb-2'  }`}
						/>
                        <p className="text-red-500 mb-2 mt-1 text-sm">{error.password}</p>

						<label
							htmlFor="confirmPassword"
							className="block  text-sm font-bold mb-1"
						>
							Confirm password
						</label>
						<input
							id="confirmPassword"
							type="password"
                            value={formData.confirmPassword}
							onChange={handleChange}
							placeholder="Confirm your password"
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${error.confirmPassword ? 'border-red-500 focus:border-red-500' : 'focus:ring-1 focus:ring-blue-400  mb-2'  }`}
						/>
                        <p className="text-red-500 mb-2 mt-1 text-sm">{error.confirmPassword}</p>

						<button
							type="submit"
							className="bg-yellow-300 p-2 w-full rounded-4xl mt-2 text-sm cursor-pointer"
						>
							Create Amazon account{" "}
						</button>
					</form>
					<div className="relative mt-6 ">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-white text-gray-500">
								Or continue with
							</span>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-center space-x-1 border p-2 border-gray-300 rounded-lg text-sm cursor-pointer">
						<Image
							alt="google icon"
							src={`/google.png`}
							width={30}
							height={30}
						/>
						<span>Sign in with Google</span>
					</div>
					<div className="mt-6 text-center text-gray-500 text-sm ">
						<span>Dont have an account? </span>
						<span className="text-blue-500 cursor-pointer">
							Sign up
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
