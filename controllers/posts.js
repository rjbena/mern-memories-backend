import mongoose from "mongoose";

import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new Post(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("No post with that id found");
    }
    const updatedPost = await Post.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(404).send("No post with that id found");
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id found");
    }
    await Post.findByIdAndRemove(id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(404).send("No post with that id found");
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No post with that id found");
    }
    const post = await Post.findById(id);
    post.likeCount = post.likeCount + 1;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(404).send("No post with that id found");
  }
};
