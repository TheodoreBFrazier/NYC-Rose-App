import React from "react";
import styled from "styled-components";
import RightNav from "./RightNav";

const StyledBurger = styled.div`
	width: 2rem;
	height: 2rem;
	position: fixed;
	right: 20px;
	z-index: 25;
	display: none;

	@media (max-width: 768px) {
		position: fixed;
		display: flex;
		justify-content: space-around;
		flex-flow: column nowrap;
	}

	div {
		width: 2rem;
		height: 0.25rem;
		background-color: ${({ open }) => (open ? `#323232` : `#111`)};
		border-radius: 10px;
		tranform-origin: 1px;
		translation: all 0.3s linear;

		&:nth-child(1) {
			transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
		}

		&:nth-child(2) {
			transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
			opacity: ${({ open }) => (open ? 0 : 1)};
		}

		&:nth-child(3) {
			transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
		}
	}
`;

export default function Burger({
	logText,
	setLogText,
	open,
	setOpen,
	dropdown,
	setDropdown,
}) {
	const toggleMouseClick = () => {
		setDropdown(!dropdown);
	};

	const toggleOpen = () => {
		setDropdown(false);
		setOpen(!open);
	};
	return (
		<>
			<StyledBurger
				open={open}
				onClick={() => {
					toggleOpen();
				}}
				className="mainHam"
			>
				<div />
				<div />
				<div />
			</StyledBurger>
			<RightNav
				open={open}
				setOpen={setOpen}
				logText={logText}
				setLogText={setLogText}
				toggleOpen={toggleOpen}
				dropdown={dropdown}
				toggleMouseClick={toggleMouseClick}
				setDropdown={setDropdown}
			/>
		</>
	);
}
