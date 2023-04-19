import { useParams } from "react-router-dom";
import { fetchReviews, fetchReviewComments, patchReview } from "./api";
import { useEffect, useState } from "react";

const Review = () => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
  const [reviewTemp, setReviewTemp] = useState({});
	const [comments, setComments] = useState([]);
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);
	const [fatalErr, setFatalErr] = useState(false);

	useEffect(() => {
		setLoading(true);
		Promise.all([fetchReviews(review_id), fetchReviewComments(review_id)])
			.catch((err) => {
				setLoading(false);
				setFatalErr(true);
			})
			.then((promises) => {
				setReviewTemp(promises[0].review[0]);

				setReview(promises[0].review[0]);
				setComments(promises[1].comments);
			})
			.finally(() => setLoading(false));
	}, [review_id]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleReview = (num) => {
		setReview(() => {
			const copyObj = Object.assign({}, review);
			copyObj.votes = copyObj.votes + num;
			return copyObj;
		});
		return patchReview(review.review_id, num).catch((err) => {
			setReview(() => {
				const copyObj = Object.assign({}, review);
				copyObj.votes = copyObj.votes - num;
				return copyObj;
			});
			setErr(true);
		});
	};

	if (loading) return <div className="notification">Loading...</div>;
	else if (fatalErr)
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
				<p></p>
			)}
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
								handleReview(-1);
							}}
							disabled={review.votes < reviewTemp.votes}
						>
							⬇
						</button>
						<div className="vote-count">{review.votes}</div>
						<button
							onClick={(e) => {
								handleReview(1);
							}}
							disabled={review.votes > reviewTemp.votes}
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
