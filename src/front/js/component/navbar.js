import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from '../component/LeftHeader.jsx';

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Bienvenido</span>
				</Link>
				<div className="ml-auto">
					<LogoutButton />

				</div>
			</div>
		</nav>
	);
};
