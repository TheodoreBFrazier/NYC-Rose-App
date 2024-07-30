import PendingMentors from "../components/PendingMentors";
import PendingResources from "../components/PendingResources";
import React from "react";
import "../components/Admin.css";

function ToVerify() {
	return (
		<div className="admin_pendings">
			<h2>Mentors Table</h2>
			<PendingMentors />
			<hr />
			<hr />
			<h2>Resources Table</h2>
			<br />
			<PendingResources />
		</div>
	);
}
export default ToVerify;
