import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Content from "./components/Content";
import Reviews from "./components/Reviews";

function App() {
	return (
		<body>
			<Header />
			<Routes>
				<Route path="/reviews" element={<Reviews />} />
				<Route path="/" element={<Content />}></Route>
			</Routes>
		</body>
	);
}

export default App;
