import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralShowMessage from "./GeneralShowMessage";
import "../css/Mentor.css";

const API = process.env.REACT_APP_API_URL;
function Mentor({ mentor }) {
	const [user, setUser] = useState({});
	const [open, setOpen] = useState(false);
	const uid = localStorage.getItem("userId");
	const navigate = useNavigate();
	// const [showMessage, setShowMessage] = useState(false);
	useEffect(() => {
		//  { withCredentials: true }
		axios
			.get(`${API}/users/${uid}`)
			.then((res) => setUser(res.data.result))
			.catch((e) => console.log(e));
	}, [uid]);
	//  { withCredentials: true }
	const addMentor = (mentor) => {
		user.mentor_id = mentor.mentor_id;
		axios
			.put(`${API}/users/${user.uid}`, user)
			.then((res) => {
				setOpen(true);
				localStorage.setItem("userMentor", JSON.stringify(mentor));
			})
			.catch((e) => console.log(e));
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};
	return (
		<main className="whole__card">
			<div>
				<GeneralShowMessage
					severity="success"
					message="Mentor added successfully..."
					open={open}
					handleClose={handleClose}
					anchorOrigin={{
						vertical: "top",
						horizontal: "center",
					}}
				/>
			</div>
			<div className="mentor__card__info">
				<figure className="card__thumb">
					<img
						onClick={() => navigate(`/mentors/${mentor.mentor_id}/upload`)}
						src={
							mentor.mentor_image
								? `${API}/${mentor.mentor_image}`
								: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Y3ZPszS_3YY0cewvxvIHIuRoG1Q_94s21K77pbxTF7MtVLi_kyCQ326MpFL2YpeJnGU&usqp=CAU"
						}
						style={{ width: "200px" }}
						alt="mentor-img"
					/>
				</figure>
				<div className="card__content">
					<div className="card__content__one">
						<h3 className="card__full__name">
							{mentor.mentor_fname} {mentor.mentor_lname}
						</h3>
						<p className="card__speciality">{mentor.speciality}</p>
						<p className="card__email">{mentor.email}</p>
					</div>

					<aside>
						<p className="card__description">{mentor.bio}</p>
					</aside>

					<div style={{ textAlign: "center" }}>
						<button
							variant="outlined"
							size="medium"
							style={{
								background_color: "rgb(22 38 85)",
								fontSize: "10px",
							}}
							onClick={() => addMentor(mentor)}
						>
							{" "}
							Add Mentor
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}

export default Mentor;
