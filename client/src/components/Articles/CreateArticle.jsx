import React, {useEffect, useState} from "react";
import axios from "axios";

const CreateArticle = () => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        description: "",
       // date: "", // Set the date according to your requirements
       // owner: "", // Set the owner according to your requirements
    });


    useEffect(() => {
        // Fetch authentication token from cookies or wherever it's stored
        const authToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
            "$1"
        );

        // Set authentication token in axios headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to your backend API endpoint
            const response = await axios.post("http://localhost:8080/api/articles", formData);

            // Handle the response as needed
            console.log(response.data);
            window.location = "/";
        } catch (error) {
            // Handle errors
            console.error("Error creating article:", error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} />

            <label>Content:</label>
            <textarea name="content" value={formData.content} onChange={handleChange}></textarea>

            <label>Description:</label>
            <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <button type="submit">Create Article</button>
        </form>
    );
};

export default CreateArticle;
