import React from "react";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Button from "@mui/material/Button";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Ul = styled.ul`
	@media (max-width: 768px) {
		flex-flow: column nowrap;
		background-color: inherit;
		position: fixed;
		transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
		top: 0px;
		right: 0;
		width: 180px;
		padding-top: 3.5rem;
		transition: 0.3s ease-in-out;
		z-index: 20;
		margin-top: 10px;
		height: 340px;
		border-radius: 10px;
		box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
			rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
	}
`;

export default function RightNav({
	open,
	setOpen,
	logText,
	setLogText,
	handleClick,
	toggleOpen,
	dropdown,
	toggleMouseClick,
	setDropdown,
}) {
	const logOut = () => {
		localStorage.clear();
		setLogText("Log In");
	};
	const userId = localStorage.getItem("userId");
	//user data from local storage
	const userInfo = JSON.parse(localStorage.getItem("userInfo"));

	return (
		<Ul open={open} className="navLinks">
			<li className="eachLi mainLi " onClick={toggleMouseClick}>
				<div>
					Resources
					{!dropdown ? (
						<ArrowDropDownIcon fontSize="medium"></ArrowDropDownIcon>
					) : (
						<ArrowDropUpIcon fontSize="medium"></ArrowDropUpIcon>
					)}
				</div>
				{dropdown && (
					<Dropdown
						handleClick={handleClick}
						open={open}
						toggleOpen={toggleOpen}
						setOpen={setOpen}
						setDropdown={setDropdown}
					/>
				)}
			</li>
			<li
				onClick={() => {
					toggleOpen();
				}}
				className="eachLi mainLi"
			>
				<Link to="/about">About</Link>
			</li>

			{!userInfo ? (
				""
			) : userInfo.is_admin && !isNaN(userId) ? (
				<li
					onClick={() => {
						toggleOpen();
					}}
					className="eachLi mainLi"
				>
					<Link to="admin">Admin Page</Link>
				</li>
			) : (
				<li
					onClick={() => {
						toggleOpen();
					}}
					className="eachLi mainLi"
				>
					<Link to={`/users/${userId}`}>Dashboard</Link>
				</li>
			)}

			<li
				onClick={() => {
					toggleOpen();
				}}
				className="eachLi mainLi"
			>
				{userId && !isNaN(userId) ? (
					<Link to="/mentors">Mentors</Link>
				) : (
					<Link to="/mentors/create">Mentors</Link>
				)}
			</li>
			<div
				onClick={() => {
					toggleOpen();
				}}
				className="loginIcon"
			>
				{localStorage.getItem("userId") ? (
					<Link to="/">
						<Button variant="outlined" size="medium" onClick={logOut}>
							{logText}
						</Button>
					</Link>
				) : (
					<Link to="/users/login">
						<Button
							variant="contained"
							size="small"
							style={{
								background_color: "rgb(35 40 63)",
								fontSize: "18px",
							}}
						>
							{logText}
						</Button>
					</Link>
				)}
			</div>
		</Ul>
	);
}
