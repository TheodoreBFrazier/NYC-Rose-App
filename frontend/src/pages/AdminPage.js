import React from "react";
import Admin from "../components/Admin";
import Home from "../pages/Home";

function AdminPage() {
	let isAdmin = JSON.parse(localStorage.getItem("userInfo"));
	if (isAdmin === null) {
		isAdmin = false;
	} else {
		isAdmin.is_admin ? (isAdmin = true) : (isAdmin = false);
	}

	return <div>{isAdmin ? <Admin /> : <Home />}</div>;
}

export default AdminPage;
