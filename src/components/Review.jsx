import { useParams } from "react-router-dom";
import { fetchReviews, fetchReviewComments } from "./api";
import { useEffect, useState } from "react";

const Review = () => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		setLoading(true);
		Promise.all([fetchReviews(review_id), fetchReviewComments(review_id)]).then(
			(promises) => {
				setReview(promises[0].review[0]);
				setComments(promises[1].comments);
				setLoading(false);
			}
		);
	}, [review_id]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

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
				{comments.map((comment) => (
					<div key={comment.comment_id} className="review-card-comment">
						<div className="review-card-comment-info">
							<h4>{comment.author}</h4>
							<h5>{comment.created_at.slice(0, 10)}</h5>
						</div>
						<p>{comment.body}</p>
						<ul className="review-card-icon">
							<a href="/">{comment.votes}👍</a>
						</ul>
					</div>
				))}
				<form className="review-card-comment" onSubmit={handleSubmit}>
					<label htmlFor="comment">
						<h4>Post a comment:</h4>
					</label>
					<input name="comment" type="text" />
				</form>
			</section>
		</main>
	);
};

export default Review;
