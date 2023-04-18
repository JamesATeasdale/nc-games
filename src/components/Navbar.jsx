import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
	const { pathname } = useLocation();
	return (
		<ul className="nav-bar">
			<li
				style={
					pathname === "/"
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
			>
				<Link to="/">Home</Link>
			</li>
			<li
				style={
					pathname === "/reviews"
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
			>
				<Link to="/reviews">Reviews</Link>
			</li>
			<li>
				<Link to="/">Users</Link>
			</li>
		</ul>
	);
};

export default NavBar;
