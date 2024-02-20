import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
import axios from "axios";
import { useEffect } from "react";
import { SERVER } from "../utils/constants";
import useGetUserCredentials from "../hooks/useGetUserCredentials";

function Profile() {
	const { loading, user, isAuthenticated } = useContext(Context);
	useGetUserCredentials();

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				isAuthenticated && (
					<div>
						<h1>{user?.name}</h1>
						<p>{user?.email}</p>
					</div>
				)
			)}
		</>
	);
}

export default Profile;
