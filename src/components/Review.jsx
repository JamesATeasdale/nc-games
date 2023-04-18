import { useParams } from "react-router-dom";
import { fetchReviews } from "./api";
import { useEffect, useState } from "react";

const Review = () => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		Promise.all([fetchReviews(review_id)]).then((promises) => {
			setReview(promises[0].review[0]);
			setLoading(false);
		});
	}, [review_id]);

	if (loading) return <p>Loading...</p>;

	return (
		<main>
			<section className="review-content">
				<h2>{review.title}</h2>
				<div className="review-card">
					<h2>Designer: {review.designer} </h2>
					<img src={review.review_img_url} alt="" />
					<h2>Posted by: {review.owner}</h2>
					<p>{review.review_body}</p>
					<ul className="review-card-icon">
						<a href="/">{review.votes}👍</a>
					</ul>
				</div>
				{/* */}
			</section>
		</main>
	);
};

export default Review;
