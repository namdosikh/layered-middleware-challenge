const express = require('express');
const router = express.Router();

const logger = require('../middleware/logger');
const timing = require('../middleware/timing');
const auth = require('../middleware/auth');
const validateBody = require('../middleware/validateBody');
const attachTimestamp = require('../middleware/attachTimestamp');

const tweets = require('../data/tweets');

// GET /tweets - return all tweets
router.get('/', (req, res) => {
    let result = tweets;
    res.json(result);
});

router.post(
    '/',
    auth('editor'),
    validateBody(['title', 'text']),
    attachTimestamp,
    (req, res) => {
        console.log('Post timestamp:', req.timestamp);
        const { title, text } = req.body;
        
        const newTweet = {
            id: tweets.length ? tweets[tweets.length - 1].id + 1 : 1,
            title,
            text,
            createdAt: req.timestamp
        };

        tweets.push(newTweet);
        res.status(201).json(newTweet);
    }
);

router.put(
    '/:id',
    auth('editor'),
    validateBody(['title']),
    attachTimestamp,
    (req, res) => {
        console.log('Put timestamp:', req.timestamp);
        const id = parseInt(req.params.id);
        const { title, text } = req.body;
        const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

        if (tweetIndex === -1) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        const updatedTweet = {
            ...tweets[tweetIndex],
            title,
            text,
            createdAt: req.timestamp
        };

        tweets[tweetIndex] = updatedTweet;
        res.json(updatedTweet);
    }
);

router.delete(
    '/:id',
    auth('admin'),
    attachTimestamp,
    (req, res) => {    
        console.log('Delete timestamp:', req.timestamp);
        const id = parseInt(req.params.id);
        const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

        if (tweetIndex === -1) {
            return res.status(404).json({ error: 'Tweet not found' });
        }

        tweets.splice(tweetIndex, 1);
        res.status(204).send();
    }
);

module.exports = router;