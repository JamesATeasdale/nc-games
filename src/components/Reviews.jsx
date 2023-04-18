import { fetchReviews } from "./api";
import { useState, useEffect } from "react";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchReviews().then((data) => {
			setLoading(false);
			setReviews(data.reviews);
		});
	}, []);

	if (loading) return <p>Loading...</p>;

	return (
		<main>
			<section className="content">
				{reviews.map((review) => {
					return (
						<div className="card" key={review.review_id}>
							<ul className="card-icon">
								<a href="/">{review.votes}👍</a>
								<a href="/">{review.comment_count}💬</a>
							</ul>
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
						</div>
					);
				})}
			</section>
		</main>
	);
};

export default Reviews;
