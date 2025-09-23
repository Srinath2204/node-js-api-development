const { tutorials } = require("../models");
const { body } = require('express-validator');

const checkDuplicateTitles = async (title) => {
    const existingTutorial = await tutorials.findOne({ 'title': { $regex: new RegExp(`^${title}$`, 'i') } });
    if (existingTutorial) {
        throw new Error('Title already exists.');
    }
    return true;
}
exports.createRecordValidator = [
    body('title').trim().notEmpty().withMessage("Title cannot be empty").bail().custom(checkDuplicateTitles),
    body('description').trim().notEmpty().withMessage("Description cannot be empty").bail(),
    body('published').trim().notEmpty().withMessage("Published cannot be empty")
]


