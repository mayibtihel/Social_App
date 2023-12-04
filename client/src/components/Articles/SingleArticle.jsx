import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleArticle = () => {
    const { id } = useParams();
    const [article, setArticle] = useState({});
    const [error, setError] = useState(null);

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

    return (
        <div>
            {error && <p>{error}</p>}
            <h1>Article Details</h1>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>{article.description}</p>
            {/* Display other article details as needed */}

            <button type="button" onClick={() => (window.location = "/")}>
                Back
            </button>
        </div>
    );
};

export default SingleArticle;
