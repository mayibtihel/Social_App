const mongoose = require("mongoose");
const Joi = require("joi");


const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: false },
    owner: { type: String, required: false },
});



const Article = mongoose.model("article", articleSchema);

const validateArticle = (article) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        description: Joi.string().required(),
        //date: Joi.date().required(),
        //owner: Joi.string().required(),
    });

    return schema.validate(article);
}



/*const validate = (data) => {
    const schema = Joi.object({
        title: Joi.string().required().label("Title"),
        content: Joi.string().required().label("Content"),
        description: Joi.string().required().label("Description"),
        //date: Joi.string().date().required().label("Date"),
        //owner: Joi.string().owner().required().label("Email"),

    });
    return schema.validate(data);
};*/


module.exports = { Article, validateArticle };
