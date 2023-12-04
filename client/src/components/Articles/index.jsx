import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import style from "./styles.module.css";


const ArticlesList = () => {
	const [articles, setArticles] = useState([]);
	const [error, setError] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedArticleId, setSelectedArticleId] = useState(null);


	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const response = await axios.get('http://localhost:8080/api/articles');
				setArticles(response.data);
			} catch (error) {
				setError('Error fetching articles');
				console.error('Error fetching articles:', error);
			}
		};

		fetchArticles();
	}, []);


	/*const handleDelete = async (id) => {
		try {
			await axios.delete(`http://localhost:8080/api/articles/${id}`);
			// Refresh the articles list or perform any other necessary actions
			const updatedArticles = articles.filter(article => article._id !== id);
			setArticles(updatedArticles);
		} catch (error) {
			setError('Error deleting article');
			console.error('Error deleting article:', error);
		}
	};*/

	const handleDelete = async (id) => {
		// Show the confirmation modal
		setShowModal(true);
		// Store the selected article id to delete if confirmed
		setSelectedArticleId(id);
	};

	const handleConfirmDelete = async () => {
		try {
			await axios.delete(`http://localhost:8080/api/articles/${selectedArticleId}`);
			// Refresh the articles list or perform any other necessary actions
			const updatedArticles = articles.filter(article => article._id !== selectedArticleId);
			setArticles(updatedArticles);
			// Hide the confirmation modal
			setShowModal(false);
		} catch (error) {
			setError('Error deleting article');
			console.error('Error deleting article:', error);
		}
	};

	const handleCancelDelete = () => {
		// Hide the confirmation modal
		setShowModal(false);
	};


	return (

			<div className="ag-format-container">
				<div className="ag-courses_box">

					{error && <p>{error}</p>}
					{articles.length > 0 ? (
							<div>
								<h1>Articles</h1>

									{articles.map((article) => (
										<div key={article._id}>
											<div className="ag-courses_item">
												<a href={`/article/${article._id}`} className="ag-courses-item_link">
													<div className="ag-courses-item_bg"></div>

													<div className="ag-courses-item_title">{article.title}</div>
													<div className="ag-courses-item_date-box">{article.content}</div>
													<span className="ag-courses-item_date">{article.description}</span>
											{/* Display other article details as needed */}
												</a>
											</div>

											<Link to={`/article/${article._id}`}>
												<button> View Details </button>
											</Link>

											<Link to={`/edit/${article._id}`} >
												<button> Edit </button>
											</Link>

											<button onClick={() => handleDelete(article._id)}>Delete</button>

										</div>
									))}

								{/* Confirmation Modal */}
								{showModal && (
									<div>
										<p>Are you sure you want to delete this article?</p>
										<button onClick={handleConfirmDelete}>Yes</button>
										<button onClick={handleCancelDelete}>No</button>
									</div>
								)}

							</div>



			/*{error && <p>{error}</p>}
			{articles.length > 0 ? (
				<div>
					<h1>Articles</h1>
					<ul>
						{articles.map((article) => (
							<li key={article._id}>
								<h2>{article.title}</h2>
								<p>{article.content}</p>
								<p>{article.description}</p>
								{/!* Display other article details as needed *!/}

								<Link to={`/edit/${article._id}`} >
									<button>Edit</button>
								</Link>
							</li>
						))}
					</ul>
				</div>*/
			) : (
				<p>No articles available</p>
			)}
		</div>
			</div>

	);
};

export default ArticlesList;
