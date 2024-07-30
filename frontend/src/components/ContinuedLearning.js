import React from "react";
import "./ResourceCategory.css";
import DatabaseReadyMessage from "./DatabaseReadyMessage";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleResource from "./SingleResource";

const API = process.env.REACT_APP_API_URL;

export default function ContinueLearning() {
	const [continuedLearningPrograms, setContinuedLearningPrograms] = useState(
		[]
	);
	const [continuedLearningClasses, setContinuedLearningClasses] = useState([]);
	const [continuedLearningScholarhip, setContinuedLearningScholarhip] =
		useState([]);

	useEffect(() => {
		axios
			.get(API + "/resources")
			.then((response) => {
				const program = response.data.result.filter(
					(high) =>
						high.resource_category === "Program" &&
						high.is_verified === true &&
						high.resourcefor.includes("continued learning")
				);
				setContinuedLearningPrograms(program);
				const classes = response.data.result.filter(
					(high) =>
						high.resource_category === "Class" &&
						high.is_verified === true &&
						high.resourcefor.includes("continued learning")
				);
				setContinuedLearningClasses(classes);
				const scholarship = response.data.result.filter(
					(high) =>
						high.resource_category === "Scholarship" &&
						high.is_verified === true &&
						high.resourcefor.includes("continued learning")
				);
				setContinuedLearningScholarhip(scholarship);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			{!continuedLearningPrograms[0] && <DatabaseReadyMessage />}

			<div>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">Programs</h3>
						<p className="resourceP">
							The Programs are listed for Adults in need for programs <br /> to
							excel in technical skills and soft skills works that demand you .
						</p>
					</div>
					<div className="resource-arr">
						{continuedLearningPrograms.map((ContinuedLearning) => {
							return (
								<SingleResource
									key={ContinuedLearning.resource_id}
									resource={ContinuedLearning}
								/>
							);
						})}
					</div>
				</section>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">class</h3>
						<p className="resourceP">
							Classes that help Adults with skills and events that is in demand{" "}
							<br /> and take your skills to next level .
						</p>
					</div>
					<div className="resource-arr">
						{continuedLearningClasses.map((ContinuedLearning) => {
							return (
								<SingleResource
									key={ContinuedLearning.resource_id}
									resource={ContinuedLearning}
								/>
							);
						})}
					</div>
				</section>
				<section className="highSchoolMain">
					<div>
						<h3 className="subHeaderResources">scholarship</h3>
						<p className="resourceP">
							Scholarship for Adults that are looking for help and might not
							have the information , <br /> we have collected scholarship that
							are important to you .
						</p>
					</div>
					<div className="resource-arr">
						{continuedLearningScholarhip.map((ContinuedLearning) => {
							return (
								<SingleResource
									key={ContinuedLearning.resource_id}
									resource={ContinuedLearning}
								/>
							);
						})}
					</div>
				</section>
			</div>
		</>
	);
}
