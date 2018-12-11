
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load profile model
const Question = require('../../models/Question');

/**
 * type    GET
 * route   /api/questions
 * desc    route for getting questions
 * access  PUBLIC
 */
router.get('/', (req, res) => {
    Question.find()
        .sort( { date : 'desc'})
        .then( questions => res.status(200).json(questions))
        .catch(err => res.json( { questionerror : 'Question not found'}));
});

/**
 * type    POST
 * route   /api/questions/
 * desc    route to post question
 * access  PUBLIC
 */
router.post(
    '/',
    (req, res) => {
        const newQuestion = new Question({
            textone : req.body.textone,
            texttwo : req.body.texttwo,
        });
        newQuestion.save()
            .then(res.send({success:true, msg:'Question posted successfully'}))
            .catch(err => console.log(err))
});

/**
 * type    POST
 * route   /api/questions/answers
 * desc    route to answer on question
 * access  PUBLIC
 */
router.post(
    '/answers',
    (req, res) => {
        Question.findById(req.body.questionId)
            .then( question => {
                const newAnswer = {
                    name : req.body.studentEmail,
                    text : req.body.answer
                };
                question.answer.unshift(newAnswer);
                question
                    .save()
                    .then( res.send({success : true, msg:'answer posted successfully'}))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
});

module.exports = router;