import { useEffect, useState } from "react";
import { fetchUsers } from "./api";

const Users = ({ user, setUser }) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);
	useEffect(() => {
		setLoading(true);
		fetchUsers()
			.then((userList) => setUsers(userList))
			.catch((err) => setErr(err))
			.finally(() => setLoading(false));
	}, []);

	const handleLogin = (userObj) => setUser(userObj);

	if (loading) return <div className="notification">Loading...</div>;

	return (
		<main>
			{err ? (
				<div className="notification">
					Ran into an error while processing your request. Refresh or try again.
				</div>
			) : (
				""
			)}
			<section className="content">
				{users.map((userObj) => {
					return (
						<div
							className="card"
							key={userObj.username}
							style={
								userObj.username === user.username
									? { background: "orange" }
									: {}
							}
						>
							<h4>{userObj.username}</h4>
							<h5>{userObj.name}</h5>
							<img
								src={userObj.avatar_url}
								alt="avatar url"
								height="150px"
							/>{" "}
							<br />
							<button
								onClick={() => {
									if (userObj.username !== user.username) {
										handleLogin(userObj);
									} else {
										setUser({});
									}
								}}
							>
								{userObj.username === user.username ? "Log Out" : "Log in"}
							</button>
						</div>
					);
				})}
			</section>
		</main>
	);
};

export default Users;
