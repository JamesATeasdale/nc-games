import axios from "axios";

const reviewsApi = axios.create({
	baseURL: "https://nc-games-id50.onrender.com/api/",
});

export const fetchReviews = () =>
	reviewsApi.get("reviews").then((res) => res.data.reviews);
