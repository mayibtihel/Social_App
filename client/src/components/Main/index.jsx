import styles from "./styles.module.css";

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Find Me</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					LOGOUT
				</button>
			</nav>
		</div>
	);
};

export default Main;
