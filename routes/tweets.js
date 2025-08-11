const express = require("express");
const router = express.Router();

const logger = require("../middleware/logger");
const timing = require("../middleware/timing");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validateBody");
const attachTimestamp = require("../middleware/attachTimestamp");

const tweets = require("../data/tweets");

// GET /tweets - return all tweets
router.get("/", logger, timing, (req, res) => {
  let result = tweets;
  res.json(result);
});

// POST /tweets - add a new tweet
router.post(
  "/",
  logger,
  auth("editor"),
  validateBody(["title", "text"]),
  attachTimestamp,
  (req, res) => {
    const { title, text } = req.body;

    const newTweet = {
      id: tweets.length ? tweets[tweets.length - 1].id + 1 : 1,
      title,
      text,
      createdAt: req.timestamp,
    };

    tweets.push(newTweet);
    res.status(201).json(newTweet);
  }
);

// PUT /tweets/:id - edit a tweet's title and/or text
router.put(
  "/:id",
  logger,
  auth("editor"),
  validateBody(["title"]),
  attachTimestamp,
  (req, res) => {
    const id = parseInt(req.params.id);
    const { title, text } = req.body;
    const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

    if (tweetIndex === -1) {
      return res.status(404).json({ error: "Tweet not found" });
    }

    const updatedTweet = {
      ...tweets[tweetIndex],
      title,
      text,
      createdAt: req.timestamp,
    };

    tweets[tweetIndex] = updatedTweet;
    res.json(updatedTweet);
  }
);

router.delete("/:id", logger, auth("admin"), attachTimestamp, (req, res) => {
  const id = parseInt(req.params.id);
  const tweetIndex = tweets.findIndex((tweet) => tweet.id === id);

  if (tweetIndex === -1) {
    return res.status(404).json({ error: "Tweet not found" });
  }

  tweets.splice(tweetIndex, 1);
  res.status(204).send();
});

module.exports = router;
