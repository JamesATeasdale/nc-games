import { useParams } from "react-router-dom";
import { fetchReviews, fetchReviewComments, patchReview } from "./api";
import { useEffect, useState } from "react";

const Review = () => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);
	useEffect(() => {
		setLoading(true);
		Promise.all([fetchReviews(review_id), fetchReviewComments(review_id)])
			.catch((err) => {
				setLoading(false);
				setErr(err);
			})
			.then((promises) => {
				setReview(promises[0].review[0]);
				setComments(promises[1].comments);
				setLoading(false);
			});
	}, [review_id]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleReview = (id, num) => {
		return patchReview(id, num)
			.catch((err) => setErr(true))
			.then(() => {});
	};

	if (loading) return <div className="notification">Loading...</div>;
	else if (err)
		return (
			<div className="notification">
				Ran into an error while processing your request. Refresh or try again.
			</div>
		);

	return (
		<main>
			<section className="review-content">
				<h2>{review.title}</h2>
				<div className="review-card">
					<h2>Designer: {review.designer} </h2>
					<img src={review.review_img_url} alt="" />
					<h2>Posted by: {review.owner}</h2>
					<p>{review.review_body}</p>
					<ul className="card-icon">
						<button
							onClick={(e) => {
								handleReview(review.review_id, -1);
							}}
						>
							⬇
						</button>
						<div className="vote-count">{review.votes}</div>
						<button
							onClick={(e) => {
								handleReview(review.review_id, 1);
							}}
						>
							⬆
						</button>
					</ul>
				</div>
				{comments.map((comment) => (
					<div key={comment.comment_id} className="review-card-comment">
						<div className="review-card-comment-info">
							<h4>{comment.author}</h4>
							<h5>{comment.created_at.slice(0, 10)}</h5>
						</div>
						<p>{comment.body}</p>
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
