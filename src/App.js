import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { useEffect } from "react";

function App() {
	useEffect(() => {}, []);
	return (
		<main>
			<Header />
			<Routes>
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/" element={<Content />} />
			</Routes>
			<Footer />
		</main>
	);
}

export default App;
