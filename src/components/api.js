import axios from "axios";

const reviewsApi = axios.create({
	baseURL: "https://nc-games-id50.onrender.com/api/",
});

export const fetchReviews = (id = "") =>
	reviewsApi.get(`/reviews/${id}`).then((res) => res.data);

export const fetchReviewComments = (id) =>
	reviewsApi.get(`/reviews/${id}/comments`).then((res) => res.data);
