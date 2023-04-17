import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header>
			<Link to="/">
				<h1>NC Games</h1>
			</Link>
			<NavBar />
		</header>
	);
};

export default Header;
