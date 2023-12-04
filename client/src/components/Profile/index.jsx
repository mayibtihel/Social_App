import styles from "./styles.module.css";

const Profile = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>My Profile</h1>


				<div className={styles.user_dropdown}>
					<img
						src="https://www.tutorialrepublic.com/examples/images/avatar/2.jpg"
						className={styles.avatar}
						alt="Avatar"
					/>
					<div className={styles.dropdown_content}>
						<a href="#">
							<i className="fa fa-user-o"></i> Profile
						</a>
						<div className={styles.divider}></div>
						<a href="#" onClick={handleLogout}>
							<i className="material-icons">&#xE8AC;</i> Logout
						</a>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Profile;
