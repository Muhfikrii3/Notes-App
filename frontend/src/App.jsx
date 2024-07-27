import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

const routes = (
	<Router>
		<Routes>
			<Route path="/" exact element={<Login />} />
		</Routes>
	</Router>
);

const App = () => {
	return <div>{routes}</div>;
};

export default App;
