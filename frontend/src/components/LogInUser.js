import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import "../css/LogIn.css";
import { Link } from "react-router-dom";
import GeneralShowMessage from "./GeneralShowMessage";
import login from "../images/login.png";

const API = process.env.REACT_APP_API_URL;

function LogInUser({ setLogText, mentors }) {
	let navigate = useNavigate();
	const [user, setUser] = useState({
		user_name: "",
		password: "",
	});
	const [open, setOpen] = useState(false);

	const logIn = () => {
		axios
			// , { withCredentials: true }
			.post(`${API}/auth/login`, user)
			.then((res) => {
				const userInfo = res.data.result;
				const userId = userInfo.uid;
				if (!isNaN(userId)) {
					//set userId in localStorage
					localStorage.setItem("userId", `${userId}`);
					//set userInfo in localStage
					localStorage.setItem("userInfo", JSON.stringify(userInfo));
					if (userInfo.mentor_id) {
						const mentor = mentors.find(
							(el) => el.mentor_id === userInfo.mentor_id
						);
						localStorage.setItem("userMentor", JSON.stringify(mentor));
					}
					setLogText("Log Out");
					if (!userInfo.is_admin) navigate(`/users/${userId}`);
					if (userInfo.is_admin) navigate("/admin");
				}
			})
			.catch((c) => {
				if (c.response && c.response.data) {
					setOpen(true);
				}
			});
	};

	const handleChange = (event) => {
		setUser({ ...user, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		logIn();
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	const messages = [
		"Uh-oh! Did you forget your password or did it just go on vacation? 😅🔑",
		"Looks like something went awry! Maybe your password is taking a nap? 💤🔐",
		"Whoopsie! Either your password is playing hide and seek or it's on a coffee break. ☕🕵️",
		"Yikes! Your login just had a tiny hiccup. Give it another shot, superhero! 🦸‍♂️💥",
	];

	// Function to get a random message
	const getRandomMessage = () => {
		const randomIndex = Math.floor(Math.random() * messages.length);
		return messages[randomIndex];
	};

	return (
		<div className="user-login-form">
			<GeneralShowMessage
				severity="error"
				message={getRandomMessage()}
				open={open}
				anchorOrigin={{
					vertical: "top",
					horizontal: "center",
				}}
				handleClose={handleClose}
			/>
			<div className="loginDivider">
				<div className="firstLoginDiv">
					<img alt="login page img" className="loginImg" src={login} />
				</div>

				<div>
					<form onSubmit={handleSubmit} className="login-form">
						<h3>Log In</h3>
						<input
							placeholder="Username"
							type="text"
							id="user_name"
							onChange={handleChange}
							value={user.user_name}
						/>
						<input
							placeholder="Password"
							type="password"
							id="password"
							onChange={handleChange}
							value={user.password}
						/>

						<button className="login-submit">Log In</button>
						<div>
							NEW TO EDUK ? &nbsp;
							<Link to="/users/create">Sign up here !!</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
export default LogInUser;
