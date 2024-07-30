import React from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import DropDown from "./Dropdown";
import logo from "../images/logo.png";
// hamburger
import Burger from "./Burger.js";

export default function NavBar({ logText, setLogText }) {
	// the drop down with featiures
	const [dropdown, setDropdown] = useState(false);
	// the nav of the mobile phone
	const [open, setOpen] = useState(false);
	let menuRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (!menuRef.current.contains(e.target)) {
				setDropdown(false);
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => [document.removeEventListener("mousedown", handler)];
	}, []);

	return (
		<nav ref={menuRef}>
			<div>
				<Link to="/">
					<img className="logoimg" src={logo} alt="logo" />
				</Link>
			</div>
			<Burger
				logText={logText}
				setLogText={setLogText}
				open={open}
				setOpen={setOpen}
				dropdown={dropdown}
				setDropdown={setDropdown}
			/>
		</nav>
	);
}
