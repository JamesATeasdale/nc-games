import { useEffect, useState } from "react";
import { fetchUsers } from "./api";

const Users = ({ user, setUser }) => {
	const [users, setUsers] = useState([]);
	useEffect(() => {
		fetchUsers().then((userList) => {
			setUsers(userList);
		});
	}, []);

	const handleLogin = (userObj) => {
		setUser(userObj);
	};

	return (
		<section className="content">
			{users.map((userObj) => {
				return (
					<div
						className="card"
						key={userObj.username}
						style={
							userObj.username === user.username
								? { border: "3px yellow solid" }
								: {}
						}
					>
						<h4>{userObj.username}</h4>
						<h5>{userObj.name}</h5>
						<img src={userObj.avatar_url} height="150px" /> <br />
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
	);
};

export default Users;
