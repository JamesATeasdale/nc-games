import { Link } from "react-router-dom";

const Card = ({ title }) => {
	return (
		<Link className="card" to={"/" + title.toLowerCase()}>
			<h2>{title}</h2>
		</Link>
	);
};

export default Card;
