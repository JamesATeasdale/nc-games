import axios from "axios";

const reviewsApi = axios.create({
	baseURL: "https://nc-games-id50.onrender.com/api/",
});

export const fetchReviews = (id = "") =>
	reviewsApi.get(`/reviews/${id}`).then(({ data }) => data);

export const fetchReviewComments = (id) =>
	reviewsApi.get(`/reviews/${id}/comments`).then(({ data }) => data);

export const fetchUsers = () =>
	reviewsApi.get("/users").then(({ data }) => data.users);

export const patchReview = (id, num) =>
	reviewsApi.patch(`/reviews/${id}`, { votes: num });

export const postComment = (id, body) =>
	reviewsApi.post(`/reviews/${id}/comments`, body);
