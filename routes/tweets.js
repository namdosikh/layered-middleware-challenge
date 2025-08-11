const express = require("express");
const router = express.Router();

const logger = require("../middleware/logger");
const timing = require("../middleware/timing");
const auth = require("../middleware/auth");
const validateBody = require("../middleware/validateBody");
const attachTimestamp = require("../middleware/attachTimestamp");

const Post = require("../models/post");

// GET /tweets - return all posts
router.get("/", logger, timing, async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

// POST /tweets - create new post
router.post(
  "/",
  logger,
  auth("editor"),
  validateBody(["title", "text"]),
  attachTimestamp,
  async (req, res) => {
    const { title, text } = req.body;
    const newPost = new Post({ title, text, timestamp: req.timestamp });
    await newPost.save();
    res.status(201).json(newPost);
  }
);

// PUT /tweets/:id - update post
router.put(
  "/:id",
  logger,
  auth("editor"),
  validateBody(["title"]),
  attachTimestamp,
  async (req, res) => {
    const { title, text } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, text, timestamp: req.timestamp },
      { new: true }
    );
    // I don't think there should be error checking here, since we have errorHandler middleware
    // if (!updatedPost) {
    //   return res.status(404).json({ error: "Post not found" });
    // }
    res.json(updatedPost);
  }
);

// DELETE /tweets/:id - delete post
router.delete("/:id", auth("admin"), attachTimestamp, async (req, res) => {
  const deletedPost = await Post.findByIdAndDelete(req.params.id);
  // if (!deletedPost) {
  //   return res.status(404).json({ error: "Post not found" });
  // }
  res.status(204).send();
});

module.exports = router;
