import { useParams, Link } from "react-router-dom";
import {
	fetchReviews,
	fetchReviewComments,
	patchReview,
	postComment,
} from "./api";
import { useEffect, useState } from "react";

const Review = ({ user }) => {
	const { review_id } = useParams();
	const [review, setReview] = useState({});
	const [reviewTemp, setReviewTemp] = useState({});
	const [comments, setComments] = useState([]);
	const [submittedComment, setSubmittedComment] = useState("");
	const [loading, setLoading] = useState(false);
	const [err, setErr] = useState(false);
	const [fatalErr, setFatalErr] = useState(false);

	useEffect(() => {
		setLoading(true);
		Promise.all([fetchReviews(review_id), fetchReviewComments(review_id)])
			.catch((err) => {
				setLoading(false);
				setFatalErr(err);
			})
			.then((promises) => {
				setReviewTemp(promises[0].review[0]);

				setReview(promises[0].review[0]);
				setComments(promises[1].comments);
			})
			.finally(() => setLoading(false));
	}, [review_id, comments.length]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!submittedComment) alert("Please enter a comment");
		else {
			const newComment = { author: user.username, body: submittedComment };
			postComment(review_id, newComment)
				.then(() => fetchReviewComments(review_id))
				.then(({ comments }) => setComments(comments))
				.then(() => setSubmittedComment(""))
				.catch((err) => setErr(err));
		}
	};

	const handleReview = (num) => {
		setReview(() => {
			const copyObj = Object.assign({}, review);
			copyObj.votes = copyObj.votes + num;
			return copyObj;
		});
		patchReview(review.review_id, num).catch((err) => {
			setReview(reviewTemp);
			setErr(err);
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
					<h3>
						{err.response.status}: {err.response.data.msg}
					</h3>
				</div>
			) : (
				""
			)}
			<section className="review-content">
				<h2>{review.title}</h2>
				<div className="review-card">
					<img src={review.review_img_url} alt="" />
					<h2>Designer: {review.designer} </h2>
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
				{user.username ? (
					<form onSubmit={handleSubmit}>
						<div className="review-card-comment">
							<label htmlFor="comment">
								<img src={user.avatar_url} alt="" height="65px;" />
							</label>
							<input
								name="comment"
								type="textarea"
								onChange={(e) => setSubmittedComment(e.target.value)}
							/>
						</div>
						<button className="postbtn" value="Submit">
							Post
						</button>
					</form>
				) : (
					<Link
						to="/users"
						className="review-card-comment"
						style={{
							justifyContent: "center",
						}}
					>
						Log in to post a comment!
					</Link>
				)}
			</section>
		</main>
	);
};

export default Review;
