import styles from "./styles.module.css";
import ArticlesList from "../Articles";

const Main = () => {

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};



	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>MedTn</h1>

				<div >
          <span className={styles.article_container} >
            <a className={styles.article} href="/articles">Add Article</a>
          </span>

		<span className={styles.article_container} >
            <a className={styles.article} href="/profile">Profile</a>
          </span>

			<span className={styles.article_container} >
            <a className={styles.article} href="#">Contact Us</a>
          </span>

		<span className={styles.article_container} >
            <a className={styles.article} href="#">About</a>
          </span>
				</div>

				<div className={styles.user_dropdown}>
					<img
						src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
						className={styles.avatar}
						alt="Avatar"
					/>
					<div className={styles.dropdown_content}>
						<a href="/profile">
							<i className="fa fa-user-o"></i> Profile
						</a>
						<div className={styles.divider}></div>
						<a onClick={handleLogout}>
							<i className="material-icons">&#xE8AC;</i> Logout
						</a>
					</div>
				</div>



			</nav>


			<ArticlesList></ArticlesList>



		</div>
	);
};

export default Main;
