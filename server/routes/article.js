const router = require("express").Router();
const { Article, validateArticle } = require("../models/article");




// Create a New Article
router.post("/", async (req, res) => {
    try {
        const { error } = validateArticle(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const article = new Article(req.body);
        await article.save();

        res.send(article);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});



// Get all Articles
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find();
        res.send(articles);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// Get an Article by ID
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article)
            return res.status(404).send("The article with the given ID was not found.");

        res.send(article);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// Update an Article by ID

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateArticle(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!article)
            return res.status(404).send("The article with the given ID was not found.");

        res.send(article);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});


// Delete an Article by ID
router.delete("/:id", async (req, res) => {
    try {
        const article = await Article.findByIdAndRemove(req.params.id);
        if (!article)
            return res.status(404).send("The article with the given ID was not found.");

        res.send(article);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});





module.exports = router;