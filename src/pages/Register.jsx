import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../utils/constants";
import toast from "react-hot-toast";
import { Context } from "../main";
import useGetUserCredentials from "../hooks/useGetUserCredentials";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser } = useContext(Context);

	const submitHandler = async (e) => {
		e.preventDefault();
        setLoading(true);

		console.log(name, email, password);
	
		// useGetUserCredentials();

		setLoading(true);
		axios
			.get(`${SERVER}/users/me`, {
				withCredentials: true,
			})
			.then((res) => {
				setUser(res.data.user);
				setIsAuthenticated(true);
				setLoading(false);
			})
			.catch((error) => {
				setUser({});
				setIsAuthenticated(false);
				setLoading(false);
			});

		try {
			const { data } = await axios.post(
				`${SERVER}/users/new`,
				{
					name,
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

    if(isAuthenticated) {
        return <Navigate to={'/'} />
    }

	return (
		<div className="login">
			<section>
				<form onSubmit={submitHandler}>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="Name"
						required
					/>
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
					<button disabled={loading} type="submit">Sign Up</button>
					<h4>Or</h4>
					<Link to={"/login"}>Login</Link>
				</form>
			</section>
		</div>
	);
};

export default Register;
