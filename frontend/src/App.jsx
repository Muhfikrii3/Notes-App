import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/signUp";
import Home from "./pages/Home/Home";

const routes = (
	<Router>
		<Routes>
			<Route path="/" exact element={<Home />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/signUp" exact element={<SignUp />} />
		</Routes>
	</Router>
);

const App = () => {
	return <div>{routes}</div>;
};

export default App;
