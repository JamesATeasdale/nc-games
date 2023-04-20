import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Reviews from "./components/Reviews";
import Review from "./components/Review";
import Footer from "./components/Footer";
import Users from "./components/Users";
import { useEffect, useState } from "react";

function App() {
	const [user, setUser] = useState({});

	useEffect(() => {}, []);
	return (
		<main>
			<Header />
			<Routes>
				<Route path="/" element={<Content />} />
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/reviews/:review_id" element={<Review user={user} />} />
				<Route
					path="/users"
					element={<Users user={user} setUser={setUser} />}
				/>
			</Routes>
			<Footer />
		</main>
	);
}

export default App;
