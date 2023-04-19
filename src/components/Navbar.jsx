import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
	const { pathname } = useLocation();
	return (
		<ul className="nav-bar">
			<Link
				style={
					pathname === "/"
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
				to="/"
			>
				Home
			</Link>
			<Link
				style={
					pathname.includes("/reviews")
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
				to="/reviews"
			>
				Reviews
			</Link>
			<Link to="/">Users</Link>
		</ul>
	);
};

export default NavBar;
