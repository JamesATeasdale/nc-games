import NavBar from "./Navbar";
import { Link } from "react-router-dom";

const Header = ({ page, user, setUser }) => {
	return (
		<header>
			<Link to="/" className="header">
				{"NC Games".split("").map((letter) => (
					<p key={letter}>{letter}</p>
				))}
			</Link>
			<NavBar page={page} />
			<div className="drop-down-login">
				<img
					src={
						user.avatar_url
							? user.avatar_url
							: "https://icons.veryicon.com/png/o/miscellaneous/domain-icons/my-account-login.png"
					}
					alt=""
				/>
				<div className="drop-down-login-content">
					<Link to="/users"> Users</Link>
					<button
						onClick={() => {
							setUser("");
						}}
					>
						Log Out
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
