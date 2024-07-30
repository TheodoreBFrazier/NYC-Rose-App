import React from "react";

import axios from "axios";
import { useState, useEffect } from "react";
import SingleMentor from "./SingleMentor";

const API = process.env.REACT_APP_API_URL;

function MentorIndex() {
	const [mentors, setmentors] = useState([]);

	useEffect(() => {
		axios
			.get(API + "/mentors", { withCredentials: true })
			.then((response) => {
				setmentors(response.data.result);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<div className="mentors-array">
			{mentors.map((mentor) => {
				//SingleMentor JSX
				return <SingleMentor key={mentor.mentor_id} mentor={mentor} />;
			})}
		</div>
	);
}

export default MentorIndex;
