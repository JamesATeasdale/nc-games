import axios from "axios";

const reviewsApi = axios.create({
	baseURL: "https://nc-games-id50.onrender.com/api/",
});

export const fetchReviews = (id = "") =>
	reviewsApi.get(`/reviews/${id}`).then((res) => res.data);
