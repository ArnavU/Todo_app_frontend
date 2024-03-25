import { useContext, useEffect } from "react";
import { Context } from "../main";
import axios from "axios";
import { SERVER } from "../utils/constants";

function useGetUserCredentials() {
    const { isAuthenticated, setIsAuthenticated, loading, setLoading, setUser, user } = useContext(Context);

	useEffect(() => {
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
	}, []);
	
}

export default useGetUserCredentials