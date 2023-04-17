import Content from "./Content";
import { fetchReviews } from "./api";
import { useState, useEffect } from "react";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);

	useEffect(() => {
		fetchReviews().then((data) => setReviews(data));
	});

	return (
		<main>
			<h2>Reviews</h2>
			<div className="content">
				{reviews.map((review) => {
					return (
						<div className="card">
							<ul className="card-icon">
								<a href="#">{review.votes}</a>
								<a href="#">{review.comment_count}</a>
							</ul>
							<h4>{review.title}</h4>
							<img
								src={review.review_img_url}
								height="250px"
								max-width="200px"
								alt=""
							/>
							<div className="reviewBody">
								<div className="reviewInfo">
									Owner: <p>{review.owner}</p>
									Designer: <p>{review.designer}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</main>
	);
};

export default Reviews;
