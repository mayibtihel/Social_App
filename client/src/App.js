import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Articles from "./components/Articles";
import Profile from "./components/Profile";
import CreateArticle from "./components/Articles/CreateArticle";
import UpdateArticle from "./components/Articles/UpdateArticle";
import ArticlesList from "./components/Articles";
import SingleArticle from "./components/Articles/SingleArticle";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/articles" exact element={<CreateArticle />} />
			<Route path="/articlelist" exact element={<ArticlesList />} />
			<Route path="/article/:id" element={<SingleArticle />} />
			<Route path="/edit/:id" element={<UpdateArticle />} />
			<Route path="/profile" exact element={<Profile />} />

		</Routes>
	);
}

export default App;
