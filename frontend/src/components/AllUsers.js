import React from "react";
import { useState, useEffect } from "react";
import User from "./User";
import axios from "axios";
import "./allusers.css";

const API = process.env.REACT_APP_API_URL;

function AllUsers() {
	const [users, setUsers] = useState([]); //Set state to empty array

	useEffect(() => {
		axios
			.get(API + "/users")
			.then((response) => {
				setUsers(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<section className="users">
			{users.map((user) => {
				return <User key={user.uid} user={user} />;
			})}
		</section>
	);
}

export default AllUsers;
