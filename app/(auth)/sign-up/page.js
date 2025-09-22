"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext ";

export default function SignUpPage() {
	const { user } = useAuth();
	const [createUserWithEmailAndPassword] =
		useCreateUserWithEmailAndPassword(auth);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});

		if (errors[e.target.id]) {
			setErrors({
				...errors,
				[e.target.id]: "",
			});
		}
	};

	const handleSignin = () => {
		router.push("/sign-in");
	};
	//Validate input for errors
	const validateForm = () => {
		const newError = {};

		if (!formData.name.trim()) {
			newError.name = "Name is required";
		}
		if (!formData.email.trim()) {
			newError.email = "Email is required";
		}
		if (!formData.password) {
			newError.password = "Password is required";
		} else if (formData.password.length < 6) {
			newError.password = "Password must be at least 6 characters";
		}
		if (!formData.confirmPassword) {
			newError.confirmPassword = "Please confirm your password";
		} else if (formData.password !== formData.confirmPassword) {
			newError.confirmPassword = "Password do not match";
		}

		setErrors(newError);
		return Object.keys(newError).length === 0;
	};

	//Used for email and password sign in
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateForm()) {
			setIsSubmitting(true);

			try {
				//Create user with email and password for sign in
				const res = await createUserWithEmailAndPassword(
					formData.email,
					formData.password
				);
				console.log(res);

				if (res) {
					//Save user to Firestore
					await setDoc(doc(db, "amazon-users", res.user.uid), {
						uid: res.user.uid,
						displayName: formData.name,
						email: formData.email,
						photoURL: "",
						isAdmin: false,
						provider: "email",
						createdAt: new Date(),
					});
					console.log(
						"User created and saved to Firestore:",
						res.user
					);
					alert(
						"Account created successfully! Your data has been saved."
					);
					router.push("/sign-in");
				}
			} catch (error) {
				console.error("Signup error:", error);
			} finally {
				setIsSubmitting(false);
			}
		}
	};

	// Use useEffect to check authentication status
	useEffect(() => {
		if (user) {
			router.push("/");
		}
	});
	return (
		<div className="p-10 flex justify-center w-full  ">
			<div>
				<div className="relative w-40 mx-auto">
					<Image
						alt="amazon logo"
						src={`/amazon.png`}
						width={50}
						height={50}
						priority
						className="mx-auto mb-5 w-auto h-auto"
					/>
				</div>

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
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${
								errors.name
									? "border-red-500 focus:border-red-500"
									: "focus:ring-1 focus:ring-blue-400  mb-2"
							}`}
						/>
						<p className="text-red-500 mb-2 mt-1 text-sm">
							{errors.name}
						</p>

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
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${
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
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${
								errors.password
									? "border-red-500 focus:border-red-500"
									: "focus:ring-1 focus:ring-blue-400  mb-2"
							}`}
						/>
						<p className="text-red-500 mb-2 mt-1 text-sm">
							{errors.password}
						</p>

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
							className={`w-full border rounded-sm p-2 pl-3 border-gray-400 focus:outline-none  ${
								errors.confirmPassword
									? "border-red-500 focus:border-red-500"
									: "focus:ring-1 focus:ring-blue-400  mb-2"
							}`}
						/>
						<p className="text-red-500 mb-2 mt-1 text-sm">
							{errors.confirmPassword}
						</p>

						<button
							type="submit"
							disabled={isSubmitting}
							className="bg-yellow-300 p-2 w-full rounded-4xl mt-2 text-sm cursor-pointer"
						>
							{isSubmitting
								? "Creating account..."
								: "Create Amazon account"}
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
						<span>Sign up with Google</span>
					</div>
					<div
						onClick={handleSignin}
						className="mt-6 text-center text-gray-500 text-sm "
					>
						<span>Already have an account? </span>
						<span className="text-blue-500 cursor-pointer">
							Sign in
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
