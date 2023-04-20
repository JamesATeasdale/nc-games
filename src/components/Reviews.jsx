import { fetchReviews, patchReview } from "./api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const [err, setErr] = useState(false);
	const [fatalErr, setFatalErr] = useState(false);
	const [loading, setLoading] = useState(false);
	const [reviewTemplate, setReviewTemplate] = useState([]);

	useEffect(() => {
		setLoading(true);
		fetchReviews()
			.then((data) => {
				setReviews(data.reviews);
				if (reviewTemplate.length === 0) {
					setReviewTemplate(data.reviews);
				}
			})
			.catch((err) => setFatalErr(true))
			.finally(() => setLoading(false));
	}, [reviewTemplate]);

	const handleClick = (id, num) => {
		setReviews(
			reviews.map((review) => {
				if (review.review_id === id) {
					review.votes = review.votes + num;
				}
				return review;
			})
		);
		patchReview(id, num).catch((err) => {
			setReviews(
				reviews.map((review) => {
					if (review.review_id === id) {
						review.votes = review.votes - num;
					}
					return review;
				})
			);
			setErr(true);
		});
	};

	if (loading) return <div className="notification">Loading...</div>;
	if (fatalErr)
		return (
			<div className="notification">
				Ran into an error while processing your request. Refresh or try again.
			</div>
		);

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
				{reviews.map((review) => {
					return (
						<div className="card" key={review.review_id}>
							<ul className="card-icon">
								<button
									onClick={(e) => {
										handleClick(review.review_id, -1);
									}}
									disabled={
										reviewTemplate.some(
											(reviewTemp) =>
												reviewTemp.review_id === review.review_id &&
												reviewTemp.votes > review.votes
										) || err
									}
								>
									⬇
								</button>
								<div className="vote-count">{review.votes}</div>
								<button
									onClick={(e) => {
										handleClick(review.review_id, 1);
									}}
									disabled={
										reviewTemplate.some(
											(reviewTemp) =>
												reviewTemp.review_id === review.review_id &&
												reviewTemp.votes < review.votes
										) || err
									}
								>
									⬆
								</button>
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
