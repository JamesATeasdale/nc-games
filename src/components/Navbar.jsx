import { useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ page }) => {
	return (
		<ul className="nav-bar">
			<li
				style={
					page === "home"
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
			>
				<Link to="/">Home</Link>
			</li>
			<li
				style={
					page === "review"
						? { backgroundColor: "blue" }
						: { backgroundColor: "black" }
				}
			>
				<Link to="/reviews">Reviews</Link>
			</li>
			<li>
				<Link to="/">Games</Link>
			</li>
			<li>
				<Link to="/">Users</Link>
			</li>
		</ul>
	);
};

export default NavBar;
