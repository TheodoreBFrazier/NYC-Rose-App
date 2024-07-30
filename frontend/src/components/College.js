import React from "react";
import "./ResourceCategory.css";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";
import axios from "axios";
import DatabaseReadyMessage from "./DatabaseReadyMessage";

const API = process.env.REACT_APP_API_URL;

export default function College() {
	const [college, setCollege] = useState([]);
	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				setCollege(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	let collegeProgram = college.filter((high) => {
		return (
			high.resource_category === "Program" &&
			high.is_verified === true &&
			high.resourcefor.includes("college")
		);
	});
	let collegeClasses = college.filter((high) => {
		return (
			high.resource_category === "Class" &&
			high.is_verified === true &&
			high.resourcefor.includes("college")
		);
	});
	let collegeScholarship = college.filter((high) => {
		return (
			high.resource_category === "Scholarship" &&
			high.is_verified === true &&
			high.resourcefor.includes("college")
		);
	});
	return (
		<>
			{!college[0] && <DatabaseReadyMessage />}
			<div>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">Programs</h3>
						<p className="resourceP">
							The Programs are listed for college students in need for programs{" "}
							<br /> to excel in technical skills and soft skills works that
							demand you .
						</p>
					</div>
					<div className="resource-arr">
						{collegeProgram.map((college) => {
							return (
								<SingleResource key={college.resource_id} resource={college} />
							);
						})}
					</div>
				</section>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">class</h3>
						<p className="resourceP">
							Classes that help college students with skills and events that is
							in demand <br /> and take your skills to next level .
						</p>
					</div>
					<div className="resource-arr">
						{collegeClasses.map((college) => {
							return (
								<SingleResource key={college.resource_id} resource={college} />
							);
						})}
					</div>
				</section>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">scholarship</h3>
						<p className="resourceP">
							Scholarship for college students that are looking for help and
							might not have the information , <br /> we have collected
							scholarship that are important to you .
						</p>
					</div>
					<div className="resource-arr">
						{collegeScholarship.map((college) => {
							return (
								<SingleResource key={college.resource_id} resource={college} />
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}
