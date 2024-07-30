import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../css/createMentor.css";

const API = process.env.REACT_APP_API_URL;

function CreateMentor() {
	let navigate = useNavigate();
	const [mentor, setMentor] = useState({
		mentor_fname: "",
		mentor_lname: "",
		bio: "",
		email: "",
		speciality: "",
	});

	const addMentor = () => {
		axios
			.post(`${API}/mentors`, mentor)
			.then(() => {
				alert(
					"Thank you for signing up. We'll send you an invite to get started soon!"
				);
				navigate(`/`);
			})
			.catch((c) => console.warn("catch", c));
	};

	const handleTextChange = (event) => {
		setMentor({ ...mentor, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		addMentor();
	};

	return (
		<div className="create-mentor-form">
			{/* <div>
				<img
					alt="Mentor Pic"
					className="createMentorImg"
					src={
						"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Illustration_Mentoring.png/605px-Illustration_Mentoring.png"
					}
				/>
			</div> */}
			<div>
				<div className="subHeaderResources">Become a Mentor at EDUK!</div>

				<form className="mentor-form" onSubmit={handleSubmit}>
					<input
						id="mentor_fname"
						className="input"
						type="text"
						value={mentor.mentor_fname}
						placeholder="First Name"
						onChange={handleTextChange}
					/>
					<input
						id="mentor_lname"
						className="input"
						type="text"
						onChange={handleTextChange}
						value={mentor.mentor_lname}
						placeholder="Last Name"
					/>
					<input
						id="speciality"
						className="input"
						type="text"
						onChange={handleTextChange}
						value={mentor.speciality}
						placeholder="Speciality"
					/>
					<input
						id="email"
						className="input"
						type="text"
						onChange={handleTextChange}
						value={mentor.email}
						placeholder="Email Address"
					/>

					<textarea
						id="bio"
						className="input"
						type="text"
						onChange={handleTextChange}
						value={mentor.bio}
						placeholder="Bio"
					/>
					<button type="submit" className="create-mentor-submit">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default CreateMentor;
