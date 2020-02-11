const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", function(req, res) {
    Article.find(function(err, articles) {
        res.send(articles);
    });
});

app.post("/articles", function(req, res) {
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err) {
        if (!err) {
            res.send("Success");            
        }
        else {
            res.send("Error!!");
        }
    });
});

app.delete("/articles", function(req, res) {
    Article.deleteMany(function(err) {
        if (!err) {
            res.send("Successfuly deleted the articles!");            
        }
        else {
            res.send("Error!!");
        }
    });
});

app.listen(3000, function(err) {
    if (err) {
        console.log("Error!");
    }
    else {
        console.log("Server is up and running on port 3000");
    }
})