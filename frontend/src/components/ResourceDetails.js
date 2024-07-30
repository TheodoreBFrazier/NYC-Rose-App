import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import "./ResourceCategory.css";

import GeneralShowMessage from "./GeneralShowMessage";

const API = process.env.REACT_APP_API_URL;

function ResourceDetails() {
	const [resource, setResource] = useState([]);
	//show message after adding a resource
	// const [showMessage, setShowMessage] = useState(false);
	//show error
	const [err, setErr] = useState(false);
	let { resource_id } = useParams();
	//message
	const [open, setOpen] = useState(false);

	let userId = localStorage.getItem("userId");

	useEffect(() => {
		axios
			.get(API + "/resources/" + resource_id)
			.then((response) => {
				setResource(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [resource_id]);

	// adding the resource to the particular user
	const addResource = () => {
		axios
			.post(`${API}/users/${userId}/resources`, {
				uid: userId,
				resource_id: resource_id,
			})
			.then(() => setOpen(true))
			.catch((error) => {
				if (error.response) {
					setErr(true);
					setOpen(true);
				}
			});
	};

	//message
	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	return (
		<div className="resource-detail-card">
			<div className="resource-heading">
				<h1> {resource.resource_name} </h1>
				<h5>
					{resource.start_datetime === "N/A"
						? ""
						: `${resource.start_datetime} - ${resource.end_datetime}`}
				</h5>
			</div>
			<div className="resource-text">
				<p> {resource.description} </p>
				<div className="resourceMainBtn">
					{userId && !isNaN(userId) ? (
						<div>
							<Button onClick={addResource} variant="contained" size="small">
								Add resource
							</Button>
						</div>
					) : null}
					<GeneralShowMessage
						severity={err ? "warning" : "success"}
						message={
							err
								? "You Already had the resource..."
								: "Resource Added Successfully..."
						}
						open={open}
						handleClose={handleClose}
					/>

					<div className="visit-site-button">
						<a target="blank" href={resource.url}>
							<Button variant="contained" size="small">
								View
							</Button>
						</a>
					</div>

					<div>
						<React.Fragment>
							<Link to="/resources">
								<Button variant="contained" size="small">
									Back
								</Button>
							</Link>
						</React.Fragment>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ResourceDetails;
