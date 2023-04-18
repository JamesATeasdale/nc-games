import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";

function App() {
	const [page, setPage] = useState("home");
	useEffect(() => {
		setPage("home");
	}, []);
	return (
		<main>
			<Header page={page} />
			<Routes>
				<Route path="/reviews" element={<Reviews setPage={setPage} />} />
				<Route path="/" element={<Content setPage={setPage} />} />
			</Routes>
			<Footer />
		</main>
	);
}

export default App;
