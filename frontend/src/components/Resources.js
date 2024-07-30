import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";
import DatabaseReadyMessage from "./DatabaseReadyMessage";

const API = process.env.REACT_APP_API_URL;

export default function Resources() {
	const [resources, setResources] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				const allResources = response.data.result.filter(
					(resource) => resource.is_verified
				);
				setResources(allResources);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			{!resources[0] && <DatabaseReadyMessage />}
			<div className="resource-arr">
				{resources.map((resource) => {
					return (
						<SingleResource key={resource.resource_id} resource={resource} />
					);
				})}
			</div>
		</>
	);
}
