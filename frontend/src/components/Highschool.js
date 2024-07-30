import React from "react";
import "./ResourceCategory.css";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";
import DatabaseReadyMessage from "./DatabaseReadyMessage";

const API = process.env.REACT_APP_API_URL;

export default function Highschool() {
	const [highschool, setHighschool] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				setHighschool(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let highschoolPrograms = highschool.filter((high) => {
		return (
			high.resource_category === "Program" &&
			high.is_verified === true &&
			high.resourcefor.includes("highschool")
		);
	});
	let highschoolClasses = highschool.filter((high) => {
		return (
			high.resource_category === "Class" &&
			high.is_verified === true &&
			high.resourcefor.includes("highschool")
		);
	});
	let highschoolScholarship = highschool.filter((high) => {
		return (
			high.resource_category === "Scholarship" &&
			high.is_verified === true &&
			high.resourcefor.includes("highschool")
		);
	});
	return (
		<>
			{!highschool[0] && <DatabaseReadyMessage />}

			<div>
				<section className="highSchoolMain">
					<div>
						<h2 className="subHeaderResources">Programs</h2>
						<p className="resourceP">
							The Programs are listed for High school students in need for
							programs <br /> to excel in technical skills and soft skills works
							that demand you .
						</p>
					</div>
					<div className="resource-arr">
						{highschoolPrograms.map((highschool) => {
							return (
								<SingleResource
									key={highschool.resource_id}
									resource={highschool}
								/>
							);
						})}
					</div>
				</section>

				<section className="highSchoolMain">
					<div>
						<h2 className="subHeaderResources">Class</h2>
						<p className="resourceP">
							Classes that help High school students with skills and events that
							is in demand <br /> and take your skills to next level .
						</p>
					</div>
					<div className="resource-arr">
						{highschoolClasses.map((highschool) => {
							return (
								<SingleResource
									key={highschool.resource_id}
									resource={highschool}
								/>
							);
						})}
					</div>
				</section>

				<section className="highSchoolMain">
					<div>
						<h2 className="subHeaderResources">Scholarship</h2>
						<p className="resourceP">
							Scholarship for High school students that are looking for help and
							might not have the information , <br /> we have collected
							scholarship that are important to you .
						</p>
					</div>
					<div className="resource-arr">
						{highschoolScholarship.map((highschool) => {
							return (
								<SingleResource
									key={highschool.resource_id}
									resource={highschool}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}
