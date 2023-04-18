import { useEffect } from "react";
import Card from "./Card";

const Content = ({ setPage }) => {
	useEffect(() => {
		setPage("home");
	}, []);
	return (
		<div className="content">
			<Card title={"Reviews"} />
			<Card title={"test"} />
		</div>
	);
};

export default Content;
