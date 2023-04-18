import { fetchReviews } from "./api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchReviews()
			.catch((err) => {
				setLoading(false);
				setErr(err);
			})
			.then((data) => {
				setLoading(false);
				setReviews(data.reviews);
			});
	}, []);

	if (loading) return <div className="notification">Loading...</div>;
	else if (err)
		return (
			<div className="notification">
				Ran into an error while processing your request. Refresh or try again.
			</div>
		);

	return (
		<main>
			<section className="content">
				{reviews.map((review) => {
					return (
						<div className="card" key={review.review_id}>
							<ul className="card-icon">
								<a href="/">{review.votes}👍</a>
							</ul>
							<Link to={"/reviews/" + review.review_id}>
								<h4>{review.title}</h4>
								<img
									src={review.review_img_url}
									height="250px"
									max-width="200px"
									alt=""
								/>
								<li className="reviewInfo">
									<p>Owner: {review.owner}</p>
									<p>Designer: {review.designer}</p>
									<p>Posted at: {review.created_at.slice(0, 10)}</p>
								</li>
							</Link>
						</div>
					);
				})}
			</section>
		</main>
	);
};

export default Reviews;
