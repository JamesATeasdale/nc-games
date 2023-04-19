import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Header = ({ page }) => {
	return (
		<header>
			<Link to="/" className="header">
				NC Games
			</Link>
			<NavBar page={page} />
		</header>
	);
};

export default Header;
