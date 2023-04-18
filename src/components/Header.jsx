import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
	return (
		<header>
			<Link to="/" className="header">
				<h1>NC Games</h1>
			</Link>
			<NavBar page={page} />
		</header>
	);
};

export default Header;
