const db = require("../models");
const Tutorial = db.tutorials;


exports.create = (req, res) => {
    if(!req.body.title){
        res.status(400).send({message : "Content cannot be empty"});
        return;
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description : req.body.description,
        published: req.body.published ? req.body.published : false
    });

    tutorial.save(tutorial)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message : err.message || "Error occurred while creating a tutorial"
        })
    })
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title : { $regex : new RegExp(title), $options: "i" }} : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message : err.message || "Error occurred while retriving Tutorials"
            })
        })
};