const express = require("express");
const jwt = require("jsonwebtoken");


// middleware to verify authentication token
const verifyAuthToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({ message: "Unauthorized" });
        }

        // Verify the authentication token
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        req.user = decoded; // Attach user information to the request object
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized" });
    }
};

module.exports = { verifyAuthToken };

