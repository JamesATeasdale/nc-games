import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
	useEffect(() => {}, []);
	return (
		<main>
			<Header />
			<Routes>
				<Route path="/" element={<Content />} />
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/reviews/:review_id" element={<Review />} />
			</Routes>
			<Footer />
		</main>
	);
}

export default App;
