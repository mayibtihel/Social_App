import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetails = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedArticleData, setUpdatedArticleData] = useState({});


    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/articles/${id}`);

                setArticle(response.data);

            } catch (error) {
                setError('Error fetching article');
                console.error('Error fetching article:', error);
            }
        };

        fetchArticle();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8080/api/articles/${id}`, updatedArticleData);

            setArticle(response.data);
            setIsEditing(false);
            window.location = "/";
        } catch (error) {
            setError('Error updating article');
            console.error('Error updating article:', error);
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
        // Pre-fill the form with existing article data
        setUpdatedArticleData({
            title: article.title,
            content: article.content,
            description: article.description,
            // Add other fields as needed
        });
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedArticleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };



    return (
        <div>
            {error && <p>{error}</p>}
            {article && (
                <div>
                    {isEditing ? (
                        <div>
                            <h1>Edit Article</h1>
                            <label>Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={updatedArticleData.title}
                                onChange={handleInputChange}
                            />
                            <label>Content:</label>
                            <textarea
                                name="content"
                                value={updatedArticleData.content}
                                onChange={handleInputChange}
                            />
                            <label>Description:</label>
                            <textarea
                                name="description"
                                value={updatedArticleData.description}
                                onChange={handleInputChange}
                            />
                            {/* Add other input fields for additional article properties */}
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <div>
                            <h1>{article.title}</h1>
                            <p>{article.content}</p>
                            <p>{article.description}</p>
                            {/* Display other article details as needed */}
                            <button onClick={handleEditClick}>Edit Article</button>
                            <button type="button" onClick={() => (window.location = "/")}>
                                Cancel
                            </button>

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArticleDetails;
