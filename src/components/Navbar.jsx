import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
	const { pathname } = useLocation();
	return (
		<ul className="nav-bar">
			<Link
				style={
					pathname === "/"
						? { backgroundColor: "#e9ddcd", color: "#121212" }
						: {}
				}
				to="/"
			>
				Home
			</Link>
			<Link
				style={
					pathname.includes("/reviews")
						? { backgroundColor: "#e9ddcd", color: "#121212" }
						: {}
				}
				to="/reviews"
			>
				Reviews
			</Link>
			<Link
				style={
					pathname.includes("/users")
						? { backgroundColor: "#e9ddcd", color: "#121212" }
						: {}
				}
				to="/users"
			>
				Users
			</Link>
		</ul>
	);
};

export default NavBar;
