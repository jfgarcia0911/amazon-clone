'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import {Mail, Lock} from 'lucide-react'
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, googleProvider, db } from "../../firebase/config";
import { signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [signInWithEmailAndPassword , user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
// Clear error when user types
    if(errors[e.target.id]){
      setErrors({
        ...errors,
        [e.target.id]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit =async (e) => {
    e.preventDefault()
    if(validateForm()){
      setIsSubmitting(true)

      try {
        //Sign in with email and password
        const res = await signInWithEmailAndPassword(
          formData.email,
          formData.password
        )
        console.log("User signed in:", res.user);

        //Redirect to home page
        router.push('/')

      }catch(error) {
        setErrors({
          ...errors,
          password: "The email or password you entered is incorrect. Please try again."
        })
      }finally {
        setIsSubmitting(false);
      }

    }
  }

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
					<h1 className="text-3xl text-center mb-3">Sign in</h1>
          <form onSubmit={handleSubmit}>
						<label
							htmlFor="email"
							className="block text-sm font-bold mb-1"
						>
							Email address
						</label>
            <div className="relative">
            <div className="absolute inset-y-0 top-5 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail 
                    size={18} 
                    className= "text-gray-400"
                  />
                </div>
                </div>
						<input
							id="email"
							type="email"
							value={formData.email}
							onChange={handleChange}
							placeholder="Enter your email"
							className={`w-full border rounded-sm p-2 pl-10 border-gray-400 focus:outline-none  ${
								errors.email
									? "border-red-500 focus:border-red-500"
									: "focus:ring-1 focus:ring-blue-400  mb-2"
							}`}
						/>
            <p className="text-red-500 mb-2 mt-1 text-sm">
							{errors.email}
						</p>

            <label
							htmlFor="password"
							className="block text-sm font-bold mb-1"
						>
							Password
						</label>
             <div className="relative">
            <div className="absolute inset-y-0 top-5 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock 
                    size={18} 
                    className= "text-gray-400"
                  />
                </div>
                </div>
						<input
							id="password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							placeholder="Enter your password"
							className={`w-full border rounded-sm p-2 pl-10 border-gray-400 focus:outline-none  ${
								errors.password
									? "border-red-500 focus:border-red-500"
									: "focus:ring-1 focus:ring-blue-400  mb-2"
							}`}
						/>
            <p className="text-red-500 mb-2 mt-1 text-sm">
							{errors.password}
						</p>

            <button
							type="submit"
							disabled={isSubmitting}
							className="bg-yellow-300 p-2 w-full rounded-4xl mt-2 text-sm cursor-pointer"
						>
							{isSubmitting
								? "Signing in..."
								: "Sign in"}
						</button>
            </form>
				</div>
			</div>
		</div>
	);
}
