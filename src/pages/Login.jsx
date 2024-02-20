import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../main";
import toast from "react-hot-toast";
import axios from "axios";
import { SERVER } from "../utils/constants";
import useGetUserCredentials from "../hooks/useGetUserCredentials";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const {isAuthenticated, loading, setLoading, setIsAuthenticated} = useContext(Context);
	
	useGetUserCredentials();

	const submitHandler = async (e) => {
		e.preventDefault();
        setLoading(true);

		console.log(email, password);

		try {
			const { data } = await axios.post(
				`${SERVER}/users/login`,
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);

			toast.success(data.message);
			setIsAuthenticated(true);
            setLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
			setIsAuthenticated(false);
            setLoading(false);
		}
	};

	if (isAuthenticated) {
		return <Navigate to={"/"} />;
	}

	return (
		<div className="login">
			<section>
				<form onSubmit={submitHandler}>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="Email"
						required
					/>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="Password"
						required
					/>
					<button disabled={loading} type="submit">Login</button>
					<h4>Or</h4>
					<Link to={"/register"}>Sign Up</Link>
				</form>
			</section>
		</div>
	);
};

export default Login;
